type Props = {
  title: string;
  description: string;
  button?: { label: string; onClick: () => void };
  anchor?: { label: string; href: string };
};

const FormSuccess = ({ title, description, button, anchor }: Props) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {anchor && (
        <a
          href={anchor.href}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {anchor.label}
        </a>
      )}

      {button && (
        <button
          onClick={button.onClick}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {button.label}
        </button>
      )}
    </div>
  );
};

export default FormSuccess;

// Louis
