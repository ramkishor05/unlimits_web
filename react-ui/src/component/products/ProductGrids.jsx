import ProductGrid from "./ProductGrid";

const ProductGrids= (props)=>{
    const {items}= props;
    return (
        <section>
            <div className="p-1">
                <div className="row">
                    {
                        items.map(item=>
                        <div className="col-md-4 col-sm-4 col-lg-4 mb-4 mb-lg-0">
                            <ProductGrid item={item} {...props}></ProductGrid>
                        </div>
                        )
                    }
                
                </div>
            </div>
          </section>
        )
    }
    
    export default ProductGrids;