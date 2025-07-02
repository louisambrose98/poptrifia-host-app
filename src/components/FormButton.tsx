type Props = {
  isLoading: boolean;
  loadingText?: string;
  buttonText: string;
};

const FormButton = ({
  isLoading,
  loadingText = "loading...",
  buttonText,
}: Props) => (
  <button type="submit" className="w-full btn btn-primary" disabled={isLoading}>
    {isLoading ? loadingText : buttonText}
  </button>
);

export default FormButton;
