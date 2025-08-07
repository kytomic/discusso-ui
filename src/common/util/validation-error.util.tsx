import { Typography } from '@mui/material';
import type { JSX } from 'react';

export function generateValidationErrorMessage(
  errors: Record<string, any>,
  validationFields: string[],
): JSX.Element | null {
  for (const field of validationFields) {
    if (errors[field]?.message) {
      return (
        <Typography variant="body2" color="error">
          {errors[field].message}
        </Typography>
      );
    }
  }

  return null;
}
