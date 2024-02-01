const ProductGrid= (props)=>{
    const {item, addToCart, buyNow}= props;
    return (
        <div className="card">
            <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">{item.title}</p>
                <div
                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                style={{width: '35px', height: '35px'}}>
                <p className="text-white mb-0 small">x4</p>
                </div>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                className="card-img-top" alt="Laptop" />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                <p className="small"><a href="#!" className="text-muted">Laptops</a></p>
                <p className="small text-danger"><s>{item.retailPrice.price}</s></p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">HP Notebook</h5>
                <h5 className="text-dark mb-0">{item.retailPrice.price}</h5>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
                    <div className="ms-auto text-warning">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                        <button className="btn btn-outline-primary btn-sm mt-2" type="button">
                            Add to cart
                        </button>
                        <button className="btn btn-outline-primary btn-sm mt-2" type="button">
                            Buy Now
                        </button>
                </div>
            </div>
        </div>
    )
}

export default ProductGrid;