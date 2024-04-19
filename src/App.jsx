import './App.css'
import { useState, useEffect } from 'react'
import { FaWhatsapp } from "react-icons/fa";

const App = () => {

    const [textoInput, setTextoInput] = useState('')
    const [textoOutput, setTextoOutput] = useState('')
    const [isEmptyTextoInput, setIsEmptyTextoInput] = useState(true)
    const [isTextoCopiado, setIsTextoCopiado] = useState(false)

    const handleTextoInput = (e) => {
       const textoRecibido = e.target.value;
       const textoMinusculaSinAcentos = textoRecibido.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        setTextoInput(textoMinusculaSinAcentos)
    }

    const handleEncriptar = () => {
        var textoEncriptado = textoInput.replace(/[aeiouAEIOU]/g,function(encriptarLetra) {

            switch (encriptarLetra) {
    
                case "a" :   
                    return "si";
    
                case "e" :   
                    return "knter"
    
                case "i" :   
                    return "fmes";
    
                case "o" :   
                    return "pber";
    
                case "u" :    
                    return "wfat";
                
                case "A":
                    return "Si";

                case "E":
                    return "Knter";

                case "I":
                    return "Fmes";

                case "O":
                    return "Pber";
                
                case "U":
                    return "Wfat"
    
                default:   
                   return encriptarLetra;
                }   
            });
            textoInput.length > 0 ? setIsEmptyTextoInput(false) : setIsEmptyTextoInput(true)
            setTextoOutput(textoEncriptado)
            setTextoInput('')
    }

    const handleDesencriptar = () => {
        var textoDesencriptado = textoInput.replace(/si|knter|fmes|pber|wfat|Si|Knter|Fmes|Pber|Wfat/g,function(desencriptarLetra) {

            switch (desencriptarLetra) {
    
                case "si" :   
                    return "a";
    
                case "knter" :   
                    return "e"
    
                case "fmes" :   
                    return "i";
    
                case "pber" :   
                    return "o";
    
                case "wfat" :   
                    return "u";
                
                case "Si":
                    return "A";

                case "Knter":
                    return "E";

                case "Fmes":
                    return "I";

                case "Pber":
                    return "O";
                
                case "Wfat":
                    return "U"

                default:    
                    return desencriptarLetra;
    
            }            
            });
            textoInput.length > 0 ? setIsEmptyTextoInput(false) : setIsEmptyTextoInput(true)
            setTextoOutput(textoDesencriptado)
            setTextoInput('')
    }

    const handleCopiarTextoOutput = () => {
        var elementoTemporal = document.createElement("textarea")
        elementoTemporal.value = textoOutput
        document.body.appendChild(elementoTemporal)
        elementoTemporal.select()
        document.execCommand("copy")
        document.body.removeChild(elementoTemporal)
        setIsTextoCopiado(true)
    }

    const handleEnviarTextoOutput = () => {
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(textoOutput)}`;
        window.location.href = whatsappURL;
    }

    useEffect(() => {
        if (isTextoCopiado === true) {
            // Si success es true, programamos un timeout para volverlo a false después de 5 segundos.
            const timer = setTimeout(() => {
              setIsTextoCopiado(false)
            }, 5000) // 5000 milisegundos = 5 segundos
      
            // Limpia el timeout si el componente se desmonta antes de que expire el tiempo.
            return () => clearTimeout(timer)
          }
    }, [isTextoCopiado])



    return <>		
    <main>
        <h1 className="titulo">Encriptador de texto</h1>
        <div className="texto-recibido">
            <textarea cols="17" rows="9" name ="texto-recibido" id="texto-recibido" placeholder="Ingrese su texto aquí" spellcheck="false" value={textoInput} onChange={handleTextoInput}></textarea>
        </div>
        <div className="botones">
            <div className="advertencia">
                <strong>!</strong> Sólo letras sin acento
            </div>
            <div className='encriptar-desencriptar'>
                <button onClick={handleEncriptar} id="encriptar">Encriptar texto</button>
                <button onClick={handleDesencriptar} id="desencriptar">Desencriptar texto</button>
            </div>	
        </div>
        <div className="texto-mostrado">
            <textarea cols="16" rows="9" name="texto-mostrado" className={`texto-mostrado-output ${isEmptyTextoInput === false && 'texto-mostrado-output--hidden'}`} readOnly value={textoOutput} ></textarea>
            <button className={`copiar ${isTextoCopiado === true ? 'copiado' : '' }`} style={{display: isEmptyTextoInput === true ? 'none' : 'block'}} onClick={handleCopiarTextoOutput}>{isTextoCopiado === true ? 'COPIADO' : 'COPIAR'}</button>
            <button className='enviar' style={{display: isEmptyTextoInput === true ? 'none' : 'flex'}} onClick={handleEnviarTextoOutput} >ENVIAR <FaWhatsapp className='icono-enviar' /></button>
        </div>
        <video id="video-fondo" autoPlay muted loop>
            <source src="background.mp4" type="video/mp4" />
        </video>
    </main>
    <footer className='footer'>
        <a className='footer-logo' href='https://daniels-portafolio.vercel.app/'>
            {'<>Daniel Franqui</>'}
        </a>
    </footer>
</>
}

export default App