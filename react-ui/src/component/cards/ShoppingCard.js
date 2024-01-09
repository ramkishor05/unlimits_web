import { Component } from "react";
import ShoppingCartButton from "../buttons/ShoppingCartButton";
import { Button, Card, CardContent } from "@material-ui/core";
import { DeleteOutlineOutlined } from "@material-ui/icons";

const Item  = ({ product, itemQnt }) =>  {
    return (
        <Card>
            <CardContent>
                <div className="d-flex">
                    <div className="d-flex flex-row align-items-center">
                        <div className="ms-1" style={{width: '70px'}}>
                            <img
                                src={'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'}
                                className="img-fluid rounded-3" alt="" />
                        </div>
                        <div className="ms-1" style={{width: '150px'}}>
                            <p className="justify-content">{product.custProduct.title}</p>
                            <p className="small mb-0">{product.custProduct.desc}</p>
                            <p className="small mb-0">{product.custProduct.category}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center" style={{width: '150px'}}>
                        <div className="ms-1">
                            <h5 className="mb-0">{product.salePrice.price}</h5>
                        </div>
                        <div className="ms-1" >
                        <ShoppingCartButton  
                            counter={product.saleQnt} 
                            updateCounter={(counter)=> itemQnt(product, counter )}>
                        </ShoppingCartButton>     
                        </div>
                       
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default class Shoppingcard extends Component{

    render() {
        const {products, itemQnt} = this.props
        return(
                <section className="h-100 " >
                    <div className=" py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="">
                            <div className=" p-4">
                    
                                <div className="row">
                    
                                <div className="col-lg-7">
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <p className="mb-0">You have {products.length} items in your cart</p>
                                    </div>
                                    
                                    </div>
                                    <div style={{overflowX: 'auto', maxHeight:400}}>
                                    {
                                        products.map(product=>
                                            <Item product={product} itemQnt={itemQnt}></Item>
                                        )
                                    }
                                    </div>
                    {/*
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">
                                                <div>
                                                    <img
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                        className="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}}/>
                                                </div>
                                                <div className="ms-3">
                                                    <h5>Iphone 11 pro</h5>
                                                    <p className="small mb-0">256GB, Navy Blue</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div style={{width: '200px'}}>
                                                     <ShoppingCartButton counter={2} /> 
                                                </div>
                                                <div style={{width: '80px'}}>
                                                    <h5 className="mb-0">$900</h5>
                                                    </div>
                                                    <a href="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                                    <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div>
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                                                className="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}}/>
                                            </div>
                                            <div className="ms-3">
                                            <h5>Samsung galaxy Note 10 </h5>
                                            <p className="small mb-0">256GB, Navy Blue</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{width: '50px'}}>
                                            <h5 className="fw-normal mb-0">2</h5>
                                            </div>
                                            <div style={{width: '80px'}}>
                                            <h5 className="mb-0">$900</h5>
                                            </div>
                                            <a href="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                    
                                    <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div>
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
                                                className="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}}/>
                                            </div>
                                            <div className="ms-3">
                                            <h5>Canon EOS M50</h5>
                                            <p className="small mb-0">Onyx Black</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{width: '50px'}}>
                                            <h5 className="fw-normal mb-0">1</h5>
                                            </div>
                                            <div style={{width: '80px'}}>
                                            <h5 className="mb-0">$1199</h5>
                                            </div>
                                            <a href="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                    
                                    <div className="card mb-3 mb-lg-0">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div>
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                                                className="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}}/>
                                            </div>
                                            <div className="ms-3">
                                            <h5>MacBook Pro</h5>
                                            <p className="small mb-0">1TB, Graphite</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{width: '50px'}}>
                                            <h5 className="fw-normal mb-0">1</h5>
                                            </div>
                                            <div style={{width: '80px'}}>
                                            <h5 className="mb-0">$1799</h5>
                                            </div>
                                            <a href="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
        */}
                                </div>
                                <div className="col-lg-5">
                    
                                    <div className="card bg-primary text-white rounded-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Card details</h5>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                            className="img-fluid rounded-3" style={{width: '45px'}} alt="Avatar"/>
                                        </div>
                                       
                                        <hr className="my-4"/>
                    
                                        <div className="d-flex justify-content-between">
                                        <p className="mb-2">Subtotal</p>
                                        <p className="mb-2">$4798.00</p>
                                        </div>
                    
                                        <div className="d-flex justify-content-between">
                                        <p className="mb-2">Shipping</p>
                                        <p className="mb-2">$20.00</p>
                                        </div>
                    
                                        <div className="d-flex justify-content-between mb-4">
                                        <p className="mb-2">Total(Incl. taxes)</p>
                                        <p className="mb-2">$4818.00</p>
                                        </div>
                    
                                        <button type="button" className="btn btn-info btn-block btn-lg">
                                        <div className="d-flex justify-content-between">
                                            <span>$4818.00</span>
                                            <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                        </div>
                                        </button>
                    
                                    </div>
                                    </div>
                    
                                </div>
                    
                                </div>
                    
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                    )
        }

}