import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormValidationState {
  isValid: boolean;
  errors: Record<string, string>;
}

interface UseFormValidationOptions {
  validationRules: Record<string, ValidationRule>;
}

export const useFormValidation = (
  options: UseFormValidationOptions
): FormValidationState & {
  validateField: (fieldName: string, value: string) => string | null;
  validateForm: (formData: Record<string, string>) => FormValidationState;
  resetValidation: () => void;
} => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(true);

  const validateField = useCallback(
    (fieldName: string, value: string): string | null => {
      const rules = options.validationRules[fieldName];
      if (!rules) return null;

      // Check required
      if (rules.required && (!value || value.trim() === '')) {
        return `${fieldName} is required`;
      }

      // Check min length
      if (rules.minLength && value.length < rules.minLength) {
        return `${fieldName} must be at least ${rules.minLength} characters`;
      }

      // Check max length
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${fieldName} must be no more than ${rules.maxLength} characters`;
      }

      // Check pattern
      if (rules.pattern && !rules.pattern.test(value)) {
        return `${fieldName} is not in the correct format`;
      }

      // Check custom validation
      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) return customError;
      }

      return null;
    },
    [options.validationRules]
  );

  const validateForm = useCallback(
    (formData: Record<string, string>): FormValidation => {
      const newErrors: Record<string, string> = {};
      let formIsValid = true;

      Object.keys(formData).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          formIsValid = false;
        }
      });

      setErrors(newErrors);
      setIsValid(formIsValid);

      return {
        isValid: formIsValid,
        errors: newErrors,
      };
    },
    [validateField, options.validationRules]
  );

  const resetValidation = useCallback(() => {
    setErrors({});
    setIsValid(true);
  }, []);

  return {
    isValid,
    errors,
    validateField,
    validateForm,
    resetValidation,
  };
};
