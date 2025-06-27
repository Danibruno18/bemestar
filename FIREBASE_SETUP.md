# Configuração do Firebase

## 1. Instalar dependências
```bash
npm install firebase @angular/fire@19.0.0 --legacy-peer-deps
```

## 2. Criar projeto no Firebase
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em "Criar projeto"
3. Digite um nome para o projeto (ex: "bemestar-app")
4. Desative o Google Analytics (opcional)
5. Clique em "Criar projeto"

## 3. Configurar autenticação
1. No menu lateral, clique em "Authentication"
2. Clique em "Get started"
3. Vá para a aba "Sign-in method"
4. Habilite "Email/Password"
5. Clique em "Save"

## 4. Obter credenciais
1. No menu lateral, clique em "Project settings" (ícone de engrenagem)
2. Role para baixo até "Your apps"
3. Clique em "Web" (ícone </>)
4. Digite um nome para o app (ex: "bemestar-web")
5. Clique em "Register app"
6. Copie as credenciais do Firebase

## 5. Configurar no projeto
1. Abra o arquivo `src/environments/environment.ts`
2. Substitua os valores pelas suas credenciais:
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "sua-api-key",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "seu-app-id"
  }
};
```

## 6. Criar usuário de teste
1. No Firebase Console, vá para "Authentication" > "Users"
2. Clique em "Add user"
3. Digite um email e senha
4. Clique em "Add user"

## 7. Testar
1. Execute `ng serve`
2. Acesse `http://localhost:4200`
3. Use as credenciais criadas para fazer login

## Funcionalidades implementadas:
- ✅ Login com email/senha
- ✅ Registro de usuários
- ✅ Logout
- ✅ Verificação de autenticação
- ✅ Persistência de sessão
- ✅ Tratamento de erros
- ✅ Feedback visual (loading)

## Próximos passos:
- Implementar guard de rotas
- Criar páginas protegidas
- Adicionar recuperação de senha
- Implementar login social (Google, Facebook, etc.)
- Configurar regras de segurança do Firestore

## Vantagens do Firebase:
- 🔥 Autenticação robusta e segura
- 📱 Suporte a múltiplas plataformas
- 🚀 Escalabilidade automática
- 💰 Plano gratuito generoso
- 🔧 Console web intuitivo 