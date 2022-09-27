import * as Yup from "yup"

export function initialValues(){
    return{
        name:"",
        address:"",
        phone:"",
        email:"",
        description:"",
        location:null,
        images:[],

    };
}

export function validationSchema(){
    return Yup.object({
        name: Yup.string().required("Campo Obligatorio"),
        address: Yup.string().required("Campo Obligatorio"),
        phone: Yup.string().required("Campo Obligatorio"),
        email: Yup.string().email("No es un email valido").required("Campo Obligatorio"),
        description: Yup.string().required("Campo Obligatorio"),
        location: Yup.object().required("La localizacion es requerida"),
        images: Yup.array().min(1, "Se requiere una imagen como minimo").required("La imagen es requerida")
    })
}