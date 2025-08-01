import logo1 from '../assets/logo1.svg';
import logo2 from '../assets/logo2.svg';

export const Logo:React.FC =() => {
  return (
    <div>
          <img
      src={ logo1 }
      alt="App Logo"
      style={{ height: '40px' }} // or whatever size you need
    />
        <img
      src={ logo2 }
      alt="App Logo"
      style={{ height: '35px' }} // or whatever size you need
    />
    </div>


    
    
  );
}