import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortalDropdown } from "./PortalDropdown.jsx";

export const PremiumSelect = React.memo(({
  id,
  options = [],
  value,
  onChange,
  placeholder = "Select Option...",
  label,
  disabledIds = [],
  teamColorTheme = "emerald",
  renderOption,
  renderSelectedValue,
  emptyStateMessage = "No results found",
  searchPlaceholder = "Search...",
  optionLabel = "name",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Sync scroll on key navigation
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex];
      if (activeEl) {
        const container = listRef.current;
        const scrollBottom = container.clientHeight + container.scrollTop;
        const elementBottom = activeEl.offsetTop + activeEl.clientHeight;

        if (elementBottom > scrollBottom) {
          container.scrollTop = elementBottom - container.clientHeight;
        } else if (activeEl.offsetTop < container.scrollTop) {
          container.scrollTop = activeEl.offsetTop;
        }
      }
    }
  }, [highlightedIndex, isOpen]);

  // Handle auto-focus and search reset patterns
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
      setHighlightedIndex(0);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Extract option ID generically
  const getOptionId = useCallback((opt) => {
    if (!opt) return "";
    if (typeof opt === "object") {
      return opt.id !== undefined ? opt.id : opt.playerId !== undefined ? opt.playerId : opt.value !== undefined ? opt.value : opt.key || "";
    }
    return String(opt);
  }, []);

  // Extract option Label generically
  const getOptionLabel = useCallback((opt) => {
    if (!opt) return "";
    if (typeof opt === "object") {
      if (optionLabel && opt[optionLabel] !== undefined) {
        return String(opt[optionLabel]);
      }
      return opt.name || opt.title || opt.label || opt.text || String(getOptionId(opt));
    }
    return String(opt);
  }, [optionLabel, getOptionId]);

  const selectedOption = useMemo(() => {
    return options.find((opt) => getOptionId(opt) === value);
  }, [options, value, getOptionId]);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const displayLabel = getOptionLabel(opt);
      return displayLabel.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [options, searchQuery, getOptionLabel]);

  const themeClasses = useMemo(() => {
    const themes = {
      emerald: {
        accentText: "text-emerald-400",
        accentBg: "bg-emerald-500",
        accentBorder: "focus-within:border-emerald-500/45 hover:border-emerald-500/20",
        badgeText: "text-emerald-400 hover:text-emerald-300",
        glowRing: "shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_1px_rgba(16,185,129,0.2)]",
      },
      cyan: {
        accentText: "text-cyan-400",
        accentBg: "bg-cyan-500",
        accentBorder: "focus-within:border-cyan-500/45 hover:border-cyan-300/20",
        badgeText: "text-cyan-400 hover:text-cyan-300",
        glowRing: "shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_1px_rgba(6,182,212,0.2)]",
      },
      rose: {
        accentText: "text-rose-400",
        accentBg: "bg-rose-500",
        accentBorder: "focus-within:border-rose-500/45 hover:border-rose-300/20",
        badgeText: "text-rose-400 hover:text-rose-300",
        glowRing: "shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_1px_rgba(244,63,94,0.2)]",
      },
    };
    return themes[teamColorTheme] || themes.emerald;
  }, [teamColorTheme]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (filteredOptions.length > 0 ? (prev + 1) % filteredOptions.length : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          filteredOptions.length > 0 ? (prev - 1 + filteredOptions.length) % filteredOptions.length : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions.length > 0) {
          const targetOpt = filteredOptions[highlightedIndex];
          const targetId = getOptionId(targetOpt);
          if (!disabledIds.includes(targetId)) {
            onChange(targetId);
            setIsOpen(false);
          }
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  }, [isOpen, filteredOptions, highlightedIndex, disabledIds, onChange, getOptionId]);

  return (
    <div id={id} ref={containerRef} className="relative w-full text-zinc-350 group font-sans z-20">
      {label && (
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5 font-sans">
          {label}
        </span>
      )}

      {/* Trigger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 ${
          isOpen ? `${themeClasses.accentBorder} ${themeClasses.glowRing}` : "hover:border-zinc-700/60"
        } transition-all duration-200 outline-none select-none text-left cursor-pointer`}
      >
        {renderSelectedValue ? (
          renderSelectedValue(selectedOption)
        ) : selectedOption ? (
          <div className="flex items-center gap-2.5">
            <div className={`w-6 h-6 rounded-lg ${themeClasses.accentBg}/10 flex items-center justify-center font-bold text-xs ${themeClasses.accentText} border border-white/5`}>
              {getOptionLabel(selectedOption)[0] ? getOptionLabel(selectedOption)[0].toUpperCase() : ""}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white tracking-wide leading-tight">
                {getOptionLabel(selectedOption)}
              </span>
              <span className="text-[9px] font-medium text-zinc-500">
                Active Selection
              </span>
            </div>
          </div>
        ) : (
          <span className="text-zinc-500 text-xs font-medium">{placeholder}</span>
        )}

        <div className="flex items-center gap-2">
          {/* Default metadata badge if caller did not supply custom renderer, fallback label/role display */}
          {selectedOption && !renderSelectedValue && (selectedOption.role || selectedOption.badge || selectedOption.tag) && (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase">
              {selectedOption.role || selectedOption.badge || selectedOption.tag}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-400 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu via Portal */}
      <PortalDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={containerRef}
        estimatedHeight={245}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Search Box */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800/80 bg-zinc-950/60 font-sans">
                <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-white text-xs font-medium focus:outline-none placeholder-zinc-650"
                />
              </div>

              {/* Scrollable List */}
              <div
                ref={listRef}
                className="max-h-48 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent select-none font-sans"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt, index) => {
                    const optId = getOptionId(opt);
                    const isCurrentlySelected = optId === value;
                    const isHighlighted = index === highlightedIndex;
                    const isDisabled = disabledIds.includes(optId);

                    return (
                      <button
                        key={optId || index}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => {
                          onChange(optId);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-left transition-all duration-150 relative border-b border-zinc-900/40 last:border-b-0 ${
                          isHighlighted ? "bg-zinc-900" : ""
                        } ${
                          isCurrentlySelected
                            ? "bg-zinc-900/60 text-white"
                            : "text-zinc-400 hover:text-zinc-200"
                        } ${isDisabled ? "opacity-35 cursor-not-allowed bg-zinc-950/90" : "cursor-pointer"}`}
                      >
                        {renderOption ? (
                          renderOption(opt, { isSelected: isCurrentlySelected, isHighlighted, isDisabled })
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0 border border-zinc-800/60 transition-all ${
                              isCurrentlySelected
                                ? `${themeClasses.accentBg}/20 ${themeClasses.accentText} border-${teamColorTheme}-500/20`
                                : "bg-zinc-900/80 text-zinc-400"
                            }`}>
                              {getOptionLabel(opt)[0] ? getOptionLabel(opt)[0].toUpperCase() : ""}
                            </div>

                            <div className="flex flex-col">
                              <span className={`text-[11px] font-medium leading-tight ${isCurrentlySelected ? "text-white font-semibold" : "text-zinc-300"}`}>
                                {getOptionLabel(opt)}
                              </span>
                              <span className="text-[8px] text-zinc-500 font-mono">
                                {isDisabled ? "Selected / Active" : (opt.subtitle || opt.description || "Available")}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Render tag if customize is empty */}
                          {!renderOption && (opt.role || opt.badge || opt.tag) && (
                            <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase">
                              {opt.role || opt.badge || opt.tag}
                            </span>
                          )}

                          {isCurrentlySelected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                              <Check className={`w-2.5 h-2.5 ${themeClasses.accentText}`} />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-zinc-600 text-[11px] font-medium">
                    {emptyStateMessage}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalDropdown>
    </div>
  );
});
PremiumSelect.displayName = "PremiumSelect";
export default PremiumSelect;
