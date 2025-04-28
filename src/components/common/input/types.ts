export type InputType = 'box' | 'textarea' | 'line';

interface BaseProps {
  label?: string;
  placeholder?: string;
  box?: InputType;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export type InputProps = BaseProps &
  (
    | (React.InputHTMLAttributes<HTMLInputElement> & { box?: 'box' | 'line' })
    | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { box: 'textarea' })
  );
