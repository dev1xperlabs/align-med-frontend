import {
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  Chip,
  TextField,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { StyledFormControl, StyledSelect } from "@/components/styled";

import { tableStyles } from "@/styles";
import type { FilterConfig } from "./interface/iFilters";

interface FilterDropdownProps {
  filter: FilterConfig;
}

export default function FilterDropdown({ filter }: FilterDropdownProps) {
  const theme = useTheme();
  return (
    <StyledFormControl size="medium" sx={tableStyles.filterFormControl}>
      {filter.isMultiple ? (
        <Autocomplete
          multiple
          options={filter.options}
          value={Array.isArray(filter.value) ? filter.value : []}
          onChange={(_, newValue: string[]) => {
            const typedNewValue = newValue as string[];
            if (typedNewValue.length > 10) {
              filter.onChange(typedNewValue.slice(0, 10));
            } else {
              filter.onChange(typedNewValue);
            }
          }}
          disableCloseOnSelect
          filterSelectedOptions
          getOptionLabel={(option) => option}
          renderTags={(selected, getTagProps) => {
            const maxVisible = 2;
            const visible = selected.slice(0, maxVisible);
            const extraCount = selected.length - maxVisible;

            const chips = visible.map((option, index) => {
              const firstName = option.split(" ")[0];
              return (
                <Chip
                  {...getTagProps({ index })}
                  label={firstName}
                  size="small"
                  sx={tableStyles.chip}
                />
              );
            });

            if (extraCount > 0) {
              chips.push(
                <Chip
                  key="extra-count"
                  label={`+${extraCount} more`}
                  size="small"
                  sx={tableStyles.chip}
                />
              );
            }

            return chips;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={filter.label}
              placeholder={`Search ${filter.label}`}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ minHeight: 40, fontSize: 14 }}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option}>
              <Checkbox
                checked={selected}
                sx={{
                  color: theme.palette.primary.main,
                  "&.Mui-checked": { color: theme.palette.primary.main },
                }}
              />
              <ListItemText primary={option} />
            </li>
          )}
          sx={tableStyles.autocomplete}
        />
      ) : (
        <>
          <InputLabel>{filter.label}</InputLabel>
          <StyledSelect
            size="small"
            sx={tableStyles.filterSelect}
            value={filter.value}
            onChange={(e: any) =>
              filter.onChange(
                typeof e.target.value === "string" ? e.target.value : ""
              )
            }
            label={filter.label}
          >
            {filter.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option || "All"}
              </MenuItem>
            ))}
          </StyledSelect>
        </>
      )}
    </StyledFormControl>
  );
}
