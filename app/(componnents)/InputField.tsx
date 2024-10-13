interface InputFieldProps {
    className?: string | "";
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ className, label, name, type, value, onChange }) => {
    return (
        <div className={className}>
            <label className="font-bold">
            {label}
            <input className="block w-full p-2 border border-gray-300 rounded-lg"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
            </label>
        </div>
    );
};

export default InputField;