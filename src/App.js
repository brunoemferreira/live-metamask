import { useState } from 'react';
import { ethers } from 'ethers';

import './App.css';

function App() {

  const [message, setMessage] = useState('');

  async function connect() {

    // Verifica se a metamask está instalado no navegador
    if (!window.ethereum)
      return setMessage('No MetaMask installed!');
    // Mostra uma mensagem que esta tentando se conectar
    setMessage('Trying to connect....');

    await window.ethereum.send('eth_requestAccounts');

    const provider = new ethers.providers.Web3Provider(window.ethereum);


    // Ver saldo da carteira 
    const balance = await provider.getBalance('passar aqui o hash da carteira');
    setMessage(ethers.utils.formatEther(balance.toString))
  }



  return (
    <div className="App">
      <input type="button" value="Connect" onClick={event => connect()} />
      {message}
    </div>
  );
}

export default App;
