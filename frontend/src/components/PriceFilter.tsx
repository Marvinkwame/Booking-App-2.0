

type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        <div className='border-b border-slate-700 pb-5'>
            <h4 className="font-bold">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
                <option>Select Max Price</option>
                {[50, 100, 200, 300, 500].map((price) => (
                    <option value={price} key={price}>{price}</option>
                ))}
            </select>

        </div>
    )
}

export default PriceFilter