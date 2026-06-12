/**
 * Utility to validate and sanitize raw XLSX parsed rows before they are dispatched to Redux.
 * Pure functions only, with no React or Redux dependencies.
 */

/**
 * Validates a single player row.
 * @param {Object} row - Plain object representing a row of parsed data
 * @returns {Object} - Object indicating validity and list of errors
 */
export const validatePlayerRow = (row) => {
  const errors = [];
  const name = row && row.name !== undefined && row.name !== null ? String(row.name).trim() : "";
  const role = row && row.role !== undefined && row.role !== null ? String(row.role).trim().toUpperCase() : "";

  if (!name) {
    errors.push("Player name is required");
  }

  const validRoles = ["BATTER", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"];
  if (!role || !validRoles.includes(role)) {
    errors.push("Role must be BATTER, BOWLER, ALL_ROUNDER, or WICKET_KEEPER");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitizes a single player row into a clean internal player structure.
 * @param {Object} row - Raw row object
 * @param {number} index - Index in the array for unique identifier generation
 * @returns {Object} - Cleaned player object
 */
export const sanitizePlayerRow = (row, index) => {
  return {
    id: "xlsx-import-" + Date.now() + "-" + index,
    name: row.name ? row.name.toString().trim() : "",
    role: row.role ? row.role.toString().toUpperCase().trim() : "BATTER",
  };
};

/**
 * Filters empty rows, validates each row, and classifies them into clean players or errors.
 * @param {Array} rows - Array of raw row objects from parsed XLSX
 * @returns {Object} - Result object containing valid players, invalid rows, and counts
 */
export const processXLSXRows = (rows) => {
  const validPlayers = [];
  const invalidRows = [];
  let totalProcessed = 0;

  if (Array.isArray(rows)) {
    rows.forEach((row, index) => {
      // Check if row is empty (where every value is null, undefined, or empty string)
      const isRowEmpty =
        !row ||
        typeof row !== "object" ||
        Object.values(row).every(
          (val) => val === null || val === undefined || String(val).trim() === ""
        );

      if (isRowEmpty) {
        return; // Filter out empty rows
      }

      totalProcessed++;
      const { isValid, errors } = validatePlayerRow(row);

      if (isValid) {
        validPlayers.push(sanitizePlayerRow(row, index));
      } else {
        invalidRows.push({
          rowIndex: index,
          errors,
        });
      }
    });
  }

  return {
    validPlayers,
    invalidRows,
    totalProcessed,
    totalValid: validPlayers.length,
    totalInvalid: invalidRows.length,
  };
};
