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
                    return "ai";
    
                case "e" :   
                    return "enter"
    
                case "i" :   
                    return "imes";
    
                case "o" :   
                    return "ober";
    
                case "u" :    
                    return "ufat";
                
                case "A":
                    return "Ai";

                case "E":
                    return "Enter";

                case "I":
                    return "Imes";

                case "O":
                    return "Ober";
                
                case "U":
                    return "Ufat"
    
                default:   
                   return encriptarLetra;
                }   
            });
            textoInput.length > 0 ? setIsEmptyTextoInput(false) : setIsEmptyTextoInput(true)
            setTextoOutput(textoEncriptado)
            setTextoInput('')
    }

    const handleDesencriptar = () => {
        var textoDesencriptado = textoInput.replace(/ai|enter|imes|ober|ufat|Ai|Enter|Imes|Ober|Ufat/g,function(desencriptarLetra) {

            switch (desencriptarLetra) {
    
                case "ai" :   
                    return "a";
    
                case "enter" :   
                    return "e"
    
                case "imes" :   
                    return "i";
    
                case "ober" :   
                    return "o";
    
                case "ufat" :   
                    return "u";
                
                case "Ai":
                    return "A";

                case "Enter":
                    return "E";

                case "Imes":
                    return "I";

                case "Ober":
                    return "O";
                
                case "Ufat":
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