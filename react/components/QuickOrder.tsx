import React, {useEffect, useState} from 'react'
import { useMutation, useLazyQuery } from 'react-apollo';
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

const QuickOrder = () => {
    const [inputText, setInputText] = useState("");
    const [search, setSearch]= useState("");

    const [getProductData, {data:product}] = useLazyQuery(GET_PRODUCT)
    const [addToCart] = useMutation(UPDATE_CART)

    const handleChange=(evt:any)=> {
        setInputText(evt.target.value)
        console.log("Input changed",inputText);
    }

    useEffect(()=>{
        console.log("El resultado de mi producto es",product,search);
        if(product) {
            //const { productId } = product.product
            //let skuId = parseInt(productId)
            let skuId = parseInt(inputText)
            console.log("Mis datos necesarios", skuId, product)
            //alert("Gracias por ingresar algo normal.")
            addToCart({
                variables:{
                    salesChannel:"1",
                    items:[
                        {
                            id:skuId,
                            quantity:1,
                            seller:"1"
                        }
                    ]
                }
            })
            /**/
            .then(()=>{// para esto puedes colocar en el input el sku = 3
                window.location.href="/checkout"
            })/**/
        }
    },[product,search])

    const addProductToCart = ()=> {// ingresar declaracion de la mutacion.
        getProductData({
            variables:{
                sku:inputText
            }
        })
    }

    const searchProduct = (evt:any)=> {
        evt.preventDefault();
        if(!inputText){
            alert("Oiga, ingrese algo")
        } else {
            console.log("Al final estamos buscando", inputText);
            setSearch(inputText)
            addProductToCart()
        }
    }
    return (
        <div>
            <h2>Compra rápida de VTEX U</h2>
            <form onSubmit={searchProduct}>
                <div>
                    <label htmlFor='sku'>Ingresa el número de SKU</label>
                    <input id='sku' type='text' onChange={handleChange}></input>
                </div>
                <input type='submit' value="AÑADIR AL CARRITO"></input>
            </form>
        </div>)
}

export default QuickOrder