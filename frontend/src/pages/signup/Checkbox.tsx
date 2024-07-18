export default function GenderCheckBox (){
    return (
        <div className="flex">
            <div className="form-control">
                <label htmlFor="" className="label gap-2 crusor-pointer">
                    <span className="label-text">Male</span>
                    <input type="checkbox" className="checkbox border-slate-90" />
                </label>
            </div>
            <div className="form-control">
                <label htmlFor="" className="label gap-2 crusor-pointer">
                    <span className="label-text">Female</span>
                    <input type="checkbox" className="checkbox border-slate-90" />
                </label>
            </div>
        </div>
    )
}