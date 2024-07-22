export default function GenderCheckBox ({onCheckBoxChange, selectedGender}:{onCheckBoxChange: (gender: string) => void, selectedGender: string}){
    return (
        <div className="flex">
            <div className="form-control">
                <label htmlFor="" className={`label gap-2 crusor-pointer ${selectedGender === 'male' ? 'selected' : ""}`}>
                    <span className="label-text">Male</span>
                    <input type="checkbox" className="checkbox border-slate-90" checked={selectedGender === 'male'}  
                    onChange={() => onCheckBoxChange('male')} />
                </label>
            </div>
            <div className="form-control">
                <label htmlFor="" className={`label gap-2 crusor-pointer ${selectedGender === 'female' ? 'selected' : ""}`}>
                    <span className="label-text">Female</span>
                    <input type="checkbox" className="checkbox border-slate-90" checked={selectedGender === 'female'} 
                    onChange={() => onCheckBoxChange('female')}
                    />
                </label>
            </div>
        </div>
    )
}