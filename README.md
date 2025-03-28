# Aloy - Desktop Application

## Descrição
Aloy é um assistente virtual projetado para centralizar e automatizar tarefas do dia a dia. Esta versão do projeto implementa a interface desktop utilizando Electron, permitindo interação direta com o sistema operacional, integração com APIs e suporte a comandos de voz.

## Funcionalidades
- Interface desktop responsiva e interativa
- Execução de comandos de voz para automação de tarefas
- Integração com Notion para criação e organização de notas
- Conexão com Google Agenda para gerenciamento de compromissos
- Abertura de aplicativos e sites no PC
- Envio de lembretes e notificações
- Monitoramento do sistema e recursos da máquina
- Integração com assistentes baseados em LLM (LLaMA 3)
- Suporte a pesquisas na internet
- Conexão com um bot no Discord para interação remota

## Tecnologias Utilizadas
- **Electron** - Construção da interface desktop
- **Node.js** - Backend principal
- **LLaMA 3** - Processamento de IA para interação
- **Google API** - Integração com Agenda
- **Notion API** - Gerenciamento de notas
- **Discord API** - Integração com bot para execução remota de comandos
- **Prometheus & Grafana** - Monitoramento do sistema
- **Docker** - Contêinerização para serviços auxiliares

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seuusuario/aloy-electron.git
   cd aloy-electron
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie a aplicação:
   ```sh
   npm start
   ```

## Estrutura do Projeto
```
/aloy-electron
│── /src
│   │── /components    # Componentes reutilizáveis
│   │── /services      # Integrações com APIs externas
│   │── /utils         # Funções auxiliares
│   └── main.js        # Processo principal do Electron
│── package.json       # Dependências do projeto
│── README.md          # Documentação do projeto
└── .gitignore         # Arquivos ignorados pelo Git
```

## Contribuição
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature-minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie suas alterações (`git push origin feature-minha-feature`)
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
