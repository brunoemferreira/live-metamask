import { useState } from 'react';
import { ethers } from 'ethers';

import './App.css';

function App() {

  const [message, setMessage] = useState('');
  const carteira = '0xc23522c5dE8406C0e321779B9a8BA37904cfad6d';

  async function connect() {

    /*
     * Verifica se a metamask está instalado no navegador
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
    const balance = await provider.getBalance(carteira);
    setMessage(ethers.utils.formatEther(balance.toString()));
  }

  async function transfer() {
    /*
        * Verifica se a metamask está instalado no navegador
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

    // Pega a assinatura 
    const signer = provider.getSigner();

    // Valida se o hash da carteira é uma carteira válida
    ethers.utils.getAddress(carteira);

    const transaction = await signer.sendTransaction({
      to: carteira,                          // carteira de destino
      value: ethers.utils.parseEther("0.1")  // valor a ser transferido
    });

    setMessage(transaction);
  }

  return (
    <div className="App">
      <input type="button" value="Connect" onClick={event => connect()} />
      <input type="button" value="Transfer" onClick={event => transfer()} />
      <p> {JSON.stringify(message)} </p>
    </div>
  );
}

export default App;
