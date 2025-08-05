"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Typography,
  InputAdornment,
  Checkbox,
  Grow,
  ClickAwayListener,
  Chip,
  Box,
  TextField,
  Paper,
  MenuItem,
} from "@mui/material";
import { Search, KeyboardArrowDown, Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";

// =============================================================================
// INTERFACES
// =============================================================================

interface BaseDropdownProps {
  options: string[];
  placeholder: string;
  label: string;
  error?: boolean;
  disabled?: boolean;
  searchable?: boolean;
}

interface SingleSelectProps extends BaseDropdownProps {
  value: string;
  onChange: (value: string) => void;
  multiple?: false;
}

interface MultiSelectProps extends BaseDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
  multiple: true;
  maxVisibleItems?: number;
}

type GenericDropdownProps = SingleSelectProps | MultiSelectProps;

// =============================================================================
// GENERIC DROPDOWN COMPONENT
// =============================================================================

// Debounce hook
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export const GenericDropdown: React.FC<GenericDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  error = false,
  disabled = false,
  searchable = true,
  multiple = false,
  ...props
}) => {
  const maxVisibleItems = (props as MultiSelectProps).maxVisibleItems || 2;
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 200);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : options;

  // Type guards
  const isMultiple = multiple === true;
  const singleValue = !isMultiple ? (value as string) : "";
  const multiValue = isMultiple ? (value as string[]) : [];

  const handleToggle = () => {
    if (disabled) return;
    setOpen(!open);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleSingleSelect = (option: string) => {
    if (!isMultiple) {
      (onChange as (value: string) => void)(option);
      handleClose();
    }
  };

  const handleMultiSelect = (option: string) => {
    if (isMultiple) {
      const currentValues = multiValue;

      const isAlreadySelected = currentValues.includes(option);
      if (!isAlreadySelected && currentValues.length >= 5) {
        Swal.fire({
          toast: true,
          icon: "warning",
          title: "You can select up to 5 attorneys only",
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        return;
      }

      const newValue = isAlreadySelected
        ? currentValues.filter((item) => item !== option)
        : [...currentValues, option];

      (onChange as (value: string[]) => void)(newValue);
    }
  };

  const handleRemoveChip = (optionToRemove: string) => {
    if (isMultiple) {
      const newValue = multiValue.filter((item) => item !== optionToRemove);
      (onChange as (value: string[]) => void)(newValue);
    }
  };

  useEffect(() => {
    if (open && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open, searchable]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          if (isMultiple) {
            handleMultiSelect(filteredOptions[highlightedIndex]);
          } else {
            handleSingleSelect(filteredOptions[highlightedIndex]);
          }
        }
        break;
      case "Escape":
        handleClose();
        break;
    }
  };

  // Render display value with fixed height for multi-select
  const renderDisplayValue = () => {
    if (isMultiple) {
      if (multiValue.length === 0) {
        return (
          <Typography sx={{ color: "#999", fontSize: "14px", flex: 1 }}>
            {placeholder}
          </Typography>
        );
      }

      const visibleItems = multiValue.slice(0, maxVisibleItems);
      const remainingCount = multiValue.length - maxVisibleItems;

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          {/* Show visible chips */}
          {visibleItems.map((item) => (
            <Chip
              key={item}
              label={item}
              size="small"
              onDelete={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleRemoveChip(item);
              }}
              deleteIcon={<Close sx={{ fontSize: 16 }} />}
              sx={{
                height: "24px",
                fontSize: "12px",
                backgroundColor: "#8ac24a",
                color: "#00000",
                maxWidth: "120px",
                "& .MuiChip-label": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
                "& .MuiChip-deleteIcon": {
                  fontSize: "16px",
                  color: "#f9f9faff",
                  "&:hover": {
                    color: "#08ec00ff",
                  },
                },
              }}
            />
          ))}
          {remainingCount > 0 && (
            <Chip
              label={`+${remainingCount} more`}
              size="small"
              sx={{
                height: "24px",
                fontSize: "12px",
                backgroundColor: "#f5f5f5",
                color: "#666",
                fontWeight: 500,
              }}
            />
          )}
        </Box>
      );
    } else {
      return (
        <Typography
          sx={{
            color: singleValue ? "#333" : "#999",
            fontSize: "14px",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {singleValue || placeholder}
        </Typography>
      );
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative", width: "100%" }} ref={containerRef}>
        <Typography
          variant="body2"
          sx={{ mb: 1, fontWeight: 500, color: "#666", fontSize: "14px" }}
        >
          {label}
        </Typography>

        {/* Main Input Field */}
        <Box
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "48px",
            maxHeight: "48px",
            padding: "8px 12px",
            border: `1px solid ${
              error ? "#f44336" : open ? "#8bc34a" : "#e0e0e0"
            }`,
            borderRadius: "8px",
            backgroundColor: "#fff",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            overflow: "hidden",
            opacity: disabled ? 0.6 : 1,
            "&:hover": {
              borderColor: error ? "#f44336" : "#8bc34a",
            },
          }}
        >
          {renderDisplayValue()}
          <KeyboardArrowDown
            sx={{
              color: "#666",
              fontSize: "20px",
              transition: "transform 0.2s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              ml: 1,
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Dropdown Menu */}
        <Grow in={open} timeout={200}>
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              zIndex: 1300,
              mt: 0.5,
            }}
          >
            {/* Search Input */}
            {searchable && (
              <Box sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}>
                <TextField
                  ref={searchInputRef}
                  fullWidth
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ fontSize: 18, color: "#999" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            {/* Selected Items Summary (for multi-select) */}
            {isMultiple && multiValue.length > 0 && (
              <Box
                sx={{
                  p: 1.5,
                  borderBottom: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", color: "#666", fontWeight: 500 }}
                >
                  Selected ({multiValue.length}): {multiValue.join(", ")}
                </Typography>
              </Box>
            )}

            {/* Options List */}
            <Box
              sx={{
                maxHeight: searchable ? "200px" : "240px",
                overflow: "auto",
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <Box
                    key={option}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 16px",
                      cursor: "pointer",
                      backgroundColor:
                        highlightedIndex === index
                          ? "#e8f5e8"
                          : isMultiple
                          ? multiValue.includes(option)
                            ? "#e8f5e8"
                            : "transparent"
                          : singleValue === option
                          ? "#e8f5e8"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    onClick={() => {
                      if (isMultiple) {
                        handleMultiSelect(option);
                      } else {
                        handleSingleSelect(option);
                      }
                    }}
                  >
                    {isMultiple && (
                      <Checkbox
                        checked={multiValue.includes(option)}
                        size="small"
                        sx={{
                          color: "#8bc34a",
                          "&.Mui-checked": {
                            color: "#8bc34a",
                          },
                          mr: 1,
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#333",
                        fontWeight: isMultiple
                          ? multiValue.includes(option)
                            ? 500
                            : 400
                          : singleValue === option
                          ? 500
                          : 400,
                        flex: 1,
                      }}
                    >
                      {option}
                    </Typography>
                    {!isMultiple && singleValue === option && (
                      <Check sx={{ fontSize: 16, color: "#8bc34a" }} />
                    )}
                  </Box>
                ))
              ) : (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography sx={{ fontSize: "14px", color: "#999" }}>
                    No results found
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grow>
      </Box>
    </ClickAwayListener>
  );
};

// =============================================================================
// CONVENIENCE COMPONENTS
// =============================================================================

// Single Select Dropdown
export const SingleSelectDropdown: React.FC<
  Omit<SingleSelectProps, "multiple">
> = (props) => <GenericDropdown {...props} multiple={false} />;

// Multi Select Dropdown
export const MultiSelectDropdown: React.FC<
  Omit<MultiSelectProps, "multiple">
> = (props) => <GenericDropdown {...props} multiple={true} />;
