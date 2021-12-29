import { useState } from 'react';
import { ethers } from 'ethers';

import './App.css';

function App() {

  const [message, setMessage] = useState('');

  async function connect() {

    /*
     * Verifica se a metamask está instalado no navegador
     * 
     * 
    */
    if (!window.ethereum)
      return setMessage('No MetaMask installed!');

    // Mostra uma mensagem que esta tentando se conectar
    setMessage('Trying to connect...');

    /*
     * Envia uma solicitaçao de acesso pedindo se a sua aplicaçao pode se conectar 
     * a uma carteira do MetaMask ( se vc autorizar a partir de agora a sua aplicaçao terá acesso ao metamask )
    */
    await window.ethereum.send('eth_requestAccounts');

    // Gateway que se conecta ao Blockchain através do metamask ( passa por padrao a conexão com o metamask )
    // Ele que envia os comandos para o metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Ver saldo da carteira 
    const balance = await provider.getBalance('0xc23522c5dE8406C0e321779B9a8BA37904cfad6d');
    setMessage(ethers.utils.formatEther(balance.toString()));
  }

  return (
    <div className="App">
      <input type="button" value="Connect" onClick={event => connect()} />
      <p> {JSON.stringify(message)} </p>
    </div>
  );
}

export default App;
