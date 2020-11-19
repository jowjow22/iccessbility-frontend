import React, { createContext, useEffect, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  name: string;
  nasc: Date;
  profilePic: string;
  address: string;
  city: string;
  personType: string;
  cpf_cnpj: string;
  bio: string;
  cover: string;
  phone: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(cpfCpnj: string, pass: string): Promise<void>;
  loading: boolean;
  signOut(): void; 
  isJuridic: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJuridic, setIsJuridic] = useState(false);


  useEffect(()=>{
    async function loadStorageData(){
       const storagedUser = await localStorage.getItem('@Iccessbility:user');
       const storagedToken = await localStorage.getItem('@Iccessbility:token');
      

       if(storagedToken && storagedUser){
          api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

          setUser(JSON.parse(storagedUser));
          if(JSON.parse(storagedUser)?.personType == 'Jurídica'){
            setIsJuridic(true);
          }
       }
       setLoading(false);
    }
    loadStorageData();
  }, []);


  async function signIn(cpfCpnj: string, pass: string){
  try{
  const res = await api.post('login', {
      cpf_cnpj: cpfCpnj,
      pass: pass
    });
    setUser(res.data.user);

    api.defaults.headers.Authorization = `Bearer ${res.data.token}`;

    localStorage.setItem('@Iccessbility:user', JSON.stringify(res.data.user));
    localStorage.setItem('@Iccessbility:token', res.data.token);
  }catch(err){
    alert("Cpf ou senha incorretos, retorne a página de login e tente novamente");
  }
  }

  async function signOut(){
    await localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, loading, signOut, isJuridic}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);

  return context;
};