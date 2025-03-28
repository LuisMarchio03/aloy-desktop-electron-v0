# ALOY SYSTEM MONITOR

O **ALOY SYSTEM MONITOR** é um serviço escrito em Golang que coleta métricas do sistema (CPU, memória, disco, rede) e as envia via WebSocket para um backend, possibilitando a visualização e o monitoramento em tempo real da infraestrutura local. Esse projeto é parte integrante da plataforma ALOY, garantindo que todo o ambiente esteja funcionando conforme o esperado.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Overview

O ALOY SYSTEM MONITOR tem como objetivo principal:

- Coletar métricas do sistema como uso de CPU, memória, disco e tráfego de rede.
- Enviar essas métricas de forma contínua via WebSocket para um servidor backend.
- Fornecer dados em tempo real que podem ser integrados com dashboards, alertas e outras ferramentas de monitoramento (Grafana, Prometheus, etc.).
- Permitir a integração com outros módulos do sistema ALOY, possibilitando comandos e notificações proativas.

## Features

- **Monitoramento de Sistema**: Coleta dados de CPU, memória, disco e rede utilizando a biblioteca [gopsutil](https://github.com/shirou/gopsutil).
- **Comunicação em Tempo Real**: Utiliza WebSocket para transmitir métricas do monitor para o servidor.
- **Reconexão Automática**: Implementa tentativas de reconexão em caso de falhas na conexão WebSocket.
- **Servidor Backend**: Fornece endpoints REST para obter informações básicas (ex.: IP, hostname) e gerencia conexões WebSocket.
- **Escalabilidade**: Estrutura modular e organizada que permite futuras expansões, como monitoramento de temperatura, uso de processos individuais e alertas proativos.

## Arquitetura

O projeto está organizado com as seguintes pastas:

- **cmd/**: Contém o `main.go`, ponto de entrada do serviço.
- **internal/monitor/**: Responsável por coletar as métricas do sistema e enviar os dados via WebSocket.
- **internal/server/**: Gerencia as conexões WebSocket, rotas HTTP e distribuição dos dados para clientes.
- **configs/**: Arquivos de configuração (ex.: YAML, JSON) para parametrizar o monitoramento.
- **tests/**: Testes unitários e de integração.

O fluxo básico consiste em:
1. O serviço coleta periodicamente métricas do sistema.
2. As métricas são enviadas ao servidor via WebSocket.
3. O servidor distribui os dados para os clientes conectados e fornece endpoints REST para consulta.

## Instalação

### Pré-requisitos

- [Go](https://golang.org/) instalado (versão 1.16 ou superior).
- Acesso à internet para baixar dependências (gopsutil, gorilla/websocket, gorilla/mux, etc.).
- (Opcional) Docker, caso deseje empacotar o serviço em um container.

### Passos

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/aloy-system-monitor-go-v0.git
   cd aloy-system-monitor-go-v0
   ```

2. **Inicializar o módulo Go:**

   ```bash
   go mod tidy
   ```

3. **Executar o serviço:**

   ```bash
   go run cmd/main.go
   ```

   O servidor deverá iniciar na porta **8080** e as métricas serão enviadas conforme o intervalo configurado.

## Uso

- **Endpoints REST:**
  - `GET /system/infos`: Retorna informações básicas do servidor, como hostname e IP.
  
- **WebSocket:**
  - Conecte-se à URL: `ws://localhost:8080/ws`
  - O servidor envia periodicamente dados em JSON com as métricas do sistema, por exemplo:
    ```json
    {
      "cpu_usage": 32.5,
      "memory_usage": 58.2,
      "disk_usage": 70.1,
      "net_sent": 102400,
      "net_recv": 204800,
      "ip": "192.168.1.100"
    }
    ```

- **Integração com o Frontend:**
  - O serviço pode ser consumido por dashboards em tempo real, como um painel React que escuta os dados via WebSocket para atualizar o status do sistema.

## Contribuição

Contribuições são bem-vindas! Siga estes passos para contribuir:

1. Fork o repositório.
2. Crie uma branch com a sua feature: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m 'Adiciona nova feature'`.
4. Envie sua branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

*Este projeto é parte do ecossistema ALOY e visa oferecer monitoramento robusto e em tempo real para garantir a alta disponibilidade e performance da infraestrutura.*
```

---

Este README contém informações completas sobre o projeto, facilitando o entendimento para novos colaboradores ou usuários. Caso precise de alguma alteração ou acréscimo, sinta-se à vontade para ajustar conforme necessário.
