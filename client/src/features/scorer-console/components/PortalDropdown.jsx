import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";

export const PortalDropdown = React.memo(({
  isOpen,
  onClose,
  anchorRef,
  children,
  placement = "bottom-start",
  matchTriggerWidth = true,
  minWidth = "",
  maxWidth = "",
  customWidth = "",
  estimatedHeight = 240,
  zIndex = 9999,
  isLoading = false,
  loadingComponent,
  isEmpty = false,
  emptyText = "No results found",
  emptyComponent,
  onKeyDown,
}) => {
  const dropdownRef = useRef(null);

  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: "auto",
  });

  const updatePosition = useCallback(() => {
    if (!anchorRef || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();

    let dropdownHeight = estimatedHeight;
    let dropdownWidth = rect.width;

    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      dropdownHeight = dropdownRect.height || estimatedHeight;
      dropdownWidth = dropdownRect.width || rect.width;
    }

    // Determine horizontal boundary limits
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 1. Calculate space above and below (with safety margin of 6px)
    const spaceBelow = viewportHeight - rect.bottom - 6;
    const spaceAbove = rect.top - 6;

    // Detect ideal vertical open direction
    let openDirection = placement.startsWith("top") ? "top" : "bottom";

    if (openDirection === "bottom") {
      // If bottom chosen but insufficient space, fallback to top if top has more space
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        openDirection = "top";
      }
    } else {
      // If top chosen but insufficient space, fallback to bottom if bottom has more space
      if (spaceAbove < dropdownHeight && spaceBelow > spaceAbove) {
        openDirection = "bottom";
      }
    }

    // Calculate vertical coordinate
    const top = openDirection === "bottom" ? rect.bottom + 6 : rect.top - dropdownHeight - 6;

    // Determine alignment (start/end)
    let align = placement.endsWith("end") ? "end" : "start";

    // Auto-detect horizontal fallback
    let left;
    if (align === "start") {
      // Align left boundary with anchor left boundary
      left = rect.left;
      // If overflows right side, try aligning to the right boundary
      if (left + dropdownWidth > viewportWidth - 6 && rect.right - dropdownWidth >= 6) {
        left = rect.right - dropdownWidth;
      }
    } else {
      // Align right boundary with anchor right boundary
      left = rect.right - dropdownWidth;
      // If overflows left side, try aligning to the left boundary
      if (left < 6 && rect.left + dropdownWidth <= viewportWidth - 6) {
        left = rect.left;
      }
    }

    // Absolute viewport safety clamp (never go out of boundaries)
    left = Math.max(6, Math.min(left, viewportWidth - dropdownWidth - 6));

    // Determine final width styles
    let finalWidthStyle = "auto";
    if (matchTriggerWidth) {
      finalWidthStyle = rect.width;
    } else if (customWidth) {
      finalWidthStyle = customWidth;
    }

    setCoords({
      top,
      left,
      width: finalWidthStyle,
    });
  }, [anchorRef, placement, matchTriggerWidth, customWidth, estimatedHeight]);

  // Recalculate position whenever open or when inputs change
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      // Safe initial double cycle for newly rendered elements height updates
      const rAF = requestAnimationFrame(updatePosition);

      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        cancelAnimationFrame(rAF);
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
  }, [isOpen, updatePosition]);

  // Use ResizeObserver for live content height detection (fully dynamic responsive size)
  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(dropdownRef.current);
    if (anchorRef && anchorRef.current) {
      resizeObserver.observe(anchorRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, updatePosition, anchorRef]);

  // Global key listener for escape & customizable navigation hooks
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        e.stopPropagation();
        return;
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, onClose, onKeyDown]);

  // Outside click handler: trigger/dropdown safety exclusions
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (anchorRef && anchorRef.current && anchorRef.current.contains(e.target)) {
        return;
      }
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
        return;
      }
      onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [isOpen, onClose, anchorRef]);

  const styleObj = useMemo(() => {
    const s = {
      position: "fixed",
      top: coords.top,
      left: coords.left,
      width: coords.width,
      zIndex: zIndex,
      pointerEvents: "auto",
    };
    if (minWidth) s.minWidth = minWidth;
    if (maxWidth) s.maxWidth = maxWidth;
    return s;
  }, [coords.top, coords.left, coords.width, zIndex, minWidth, maxWidth]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={styleObj}
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading ? (
        loadingComponent || (
          <div className="p-5 text-center text-xs font-sans text-zinc-400 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] flex items-center justify-center gap-2.5">
            <span className="h-4 w-4 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin"></span>
            Loading details...
          </div>
        )
      ) : isEmpty ? (
        emptyComponent || (
          <div className="p-5 text-center text-xs font-sans text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)]">
            {emptyText}
          </div>
        )
      ) : (
        children
      )}
    </div>,
    document.body
  );
});

PortalDropdown.displayName = "PortalDropdown";
export default PortalDropdown;
