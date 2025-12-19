# 📋 Taskfy - Gerenciador de Tarefas Moderno

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?style=for-the-badge&logo=pinia&logoColor=black)

**Uma aplicação moderna de gerenciamento de tarefas desenvolvida com Vue 3 e integração completa com API REST**

[🚀 Demo ao Vivo](https://seu-projeto.vercel.app) • [📖 Documentação](#-funcionalidades) • [🐛 Reportar Bug](https://github.com/seu-usuario/pomodoro-frontend/issues)

</div>

---

## 📋 Sobre o Projeto

**Taskfy** é um **gerenciador de tarefas moderno e intuitivo** desenvolvido para demonstrar proficiência em **Vue.js 3** e suas tecnologias relacionadas. A aplicação oferece uma experiência de usuário fluida com interface responsiva, integração completa com API RESTful e gerenciamento de estado robusto.

### 🎯 Objetivo

Demonstrar habilidades avançadas em:

- ✅ Desenvolvimento front-end com **Vue 3** (Composition API)
- ✅ Gerenciamento de estado global com **Pinia**
- ✅ Integração com **APIs REST** via Axios
- ✅ Design responsivo e moderno com **TailwindCSS**
- ✅ Boas práticas de desenvolvimento e organização de código
- ✅ Deploy em ambiente de produção (**Vercel**)

---

## ✨ Funcionalidades

### 🎨 Interface do Usuário

- 📱 **Design Responsivo** - Otimizado para desktop, tablet e mobile
- 🎭 **Animações Suaves** - Transições e feedbacks visuais elegantes
- 🌈 **UI Moderna** - Interface clean com gradientes e glassmorphism
- ♿ **Acessível** - Seguindo boas práticas de acessibilidade

### 📝 Gerenciamento de Tarefas

- ➕ **Criar Tarefas** - Formulário intuitivo com validações
- ✏️ **Atualizar Status** - Marcar tarefas como concluídas/pendentes
- 🗑️ **Deletar Tarefas** - Modal de confirmação para evitar exclusões acidentais
- 🎯 **Sistema de Prioridades** - Organize por Alta, Média ou Baixa prioridade
- 🔄 **Ordenação Inteligente** - Ordene por nome, prioridade ou data de criação

### 🔧 Recursos Técnicos

- 🔌 **Integração com API** - Comunicação completa com backend
- 💾 **Gerenciamento de Estado** - Pinia para estado global da aplicação
- 🛣️ **Roteamento** - Vue Router para navegação entre páginas
- ⚡ **Performance** - Build otimizado com Vite
- 📦 **Code Splitting** - Carregamento otimizado de componentes

---

## 🛠️ Tecnologias Utilizadas

### Core

- **[Vue.js 3.5](https://vuejs.org/)** - Framework JavaScript progressivo
- **[Vite 7.2](https://vitejs.dev/)** - Build tool de última geração
- **[Pinia 3.0](https://pinia.vuejs.org/)** - Store para gerenciamento de estado
- **[Vue Router 4.6](https://router.vuejs.org/)** - Roteamento oficial do Vue

### Estilização

- **[TailwindCSS 3.4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[PostCSS](https://postcss.org/)** - Processamento de CSS
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Prefixos CSS automáticos

### Integração & Utilitários

- **[Axios 1.13](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **[ESLint](https://eslint.org/)** - Linting e análise de código
- **[Prettier](https://prettier.io/)** - Formatação consistente de código

### Deploy

- **[Vercel](https://vercel.com/)** - Hospedagem e deploy contínuo

---

## 🏗️ Arquitetura do Projeto

```
pomodoro-frontend/
├── public/                  # Arquivos estáticos
├── src/
│   ├── assets/             # Imagens, estilos globais
│   ├── components/         # Componentes reutilizáveis
│   │   ├── TaskForm.vue    # Formulário de criação de tarefas
│   │   └── TaskList.vue    # Lista de tarefas
│   ├── router/             # Configuração de rotas
│   │   └── index.js
│   ├── services/           # Serviços e integrações
│   │   └── api.js          # Cliente Axios e endpoints
│   ├── stores/             # Stores Pinia
│   │   ├── taskStore.js    # Estado global de tarefas
│   │   └── pomodoroStore.js
│   ├── views/              # Páginas da aplicação
│   │   ├── HomeView.vue    # Página principal
│   │   └── StatsView.vue   # Página de estatísticas
│   ├── App.vue             # Componente raiz
│   └── main.js             # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### 📐 Padrões de Desenvolvimento

#### Composition API

O projeto utiliza a **Composition API** do Vue 3, proporcionando:

- Melhor organização de código
- Maior reusabilidade de lógica
- TypeScript-friendly (preparado para migração futura)

```javascript
// Exemplo de uso da Composition API
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const sortBy = ref('default')

onMounted(() => {
  taskStore.fetchTasks()
})
```

#### Gerenciamento de Estado com Pinia

Store centralizada para gerenciar tarefas com getters, actions e estado reativo:

```javascript
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),
  getters: {
    completedTasks: (state) => state.tasks.filter((t) => t.isCompleted),
    pendingTasks: (state) => state.tasks.filter((t) => !t.isCompleted),
  },
  actions: {
    async fetchTasks() {
      /* ... */
    },
    async createTask(task) {
      /* ... */
    },
  },
})
```

#### Serviço de API

Cliente Axios configurado para comunicação com o backend:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export const taskService = {
  getAll: () => api.get('/tasks'),
  create: (task) => api.post('/tasks', task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`),
}
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js versão `20.19+` ou `22.12+`
- npm ou yarn
- Git

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/PierryB/taskfy-frontend.git
cd taskfy-frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env na raiz do projeto
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

4. **Execute o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build de produção
npm run lint       # Executa linter e corrige problemas
npm run format     # Formata código com Prettier
```

---

## 🌐 Deploy

### Vercel

Este projeto está configurado para deploy automático na **Vercel**:

1. **Configure a variável de ambiente**
   - `VITE_API_URL`: URL da sua API backend

2. **Deploy automático**
   - Push para a branch `main` dispara deploy automático
   - Preview branches para pull requests

### Configuração do Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

## 🔗 Integração com Backend

Este frontend se conecta a uma API REST que fornece:

### Endpoints de Tarefas

- `GET /api/tasks` - Lista todas as tarefas
- `POST /api/tasks` - Cria nova tarefa
- `PUT /api/tasks/:id` - Atualiza tarefa
- `DELETE /api/tasks/:id` - Remove tarefa

### Endpoints de Pomodoro

- `GET /api/pomodoro` - Lista sessões Pomodoro
- `POST /api/pomodoro` - Cria nova sessão
- `GET /api/pomodoro/stats` - Estatísticas de produtividade

### Estrutura de Dados

```typescript
// Task
{
  id: string,
  title: string,
  description: string,
  priority: "High" | "Medium" | "Low",
  isCompleted: boolean,
  createdAt: Date
}
```

---

## 📱 Screenshots

### Página Principal

Interface moderna com listagem de tarefas e formulário de criação

### Sistema de Prioridades

Organização visual por cores (🔥 Alta, ⚡ Média, 🌱 Baixa)

### Modal de Confirmação

UX intuitiva para ações destrutivas

---

## 🎨 Design System

### Paleta de Cores

- **Primary**: Gradiente Indigo → Purple (`from-indigo-600 to-purple-600`)
- **Alta Prioridade**: Vermelho (`red-500`)
- **Média Prioridade**: Âmbar (`amber-500`)
- **Baixa Prioridade**: Verde (`emerald-500`)

### Componentes

- **Glassmorphism**: `bg-white/80 backdrop-blur-sm`
- **Shadows**: `shadow-lg hover:shadow-xl`
- **Transitions**: `transition-all duration-300`

---

## 📈 Próximas Funcionalidades

- [ ] 🔔 Sistema de notificações
- [ ] 📊 Dashboard de estatísticas avançadas
- [ ] 🌙 Modo escuro (dark mode)
- [ ] 🔐 Sistema de autenticação
- [ ] 👥 Tarefas colaborativas
- [ ] ⏱️ Timer Pomodoro integrado
- [ ] 📤 Exportação de dados (CSV/JSON)
- [ ] 🔍 Busca e filtros avançados

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvedor

**Seu Nome**

- 💼 [LinkedIn](https://linkedin.com/in/seu-perfil)
- 🐙 [GitHub](https://github.com/seu-usuario)
- 📧 Email: seu-email@example.com
- 🌐 Portfolio: [seu-portfolio.com](https://seu-portfolio.com)

---

## 🙏 Agradecimentos

- [Vue.js Team](https://vuejs.org/) pelo excelente framework
- [Tailwind CSS](https://tailwindcss.com/) pela biblioteca de utilitários
- [Vercel](https://vercel.com/) pela plataforma de deploy
- Comunidade open source por todas as ferramentas incríveis

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Desenvolvido por **Pierry Boettscher** | Feito com ❤️ e Vue.js

</div>
