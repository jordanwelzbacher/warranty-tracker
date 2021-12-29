const AddWarrantyForm = () => {
  const [product, setProduct] = useState("");


  const handleChange = e => {
    setProduct(e.target.value);
  }

  const handleSubmiut = async (e) => {
    e.preventDefault();
    const data = await axios.post(`${baseUrl}/warranty`, {})
  }

  return (
    <div>
      <form onSubmit={handleSubmiut}>
        <label htmlFor="product">Product</label>
        <input
          onChange={handleChange}
          type="text"
          name="product"
          id="product"
          value={product}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddWarrantyForm
