const FormField = ({ label, error, children }) => (
    <div className="mb-4">
        <label className="block text-slate-600 capitalize mb-1">{label}</label>
        {children}
        {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
);

export default FormField;
