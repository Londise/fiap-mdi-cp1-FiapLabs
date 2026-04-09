# FIAP LABS - Agendamento Inteligente de Salas
## 📝 Sobre o projeto
### O problema
O acesso aos laboratórios de uso livre (Labs) na FIAP e o agendamento de salas de aula para estudos hoje sofrem com a falta de centralização. O aluno muitas vezes desconhece quais salas estão realmente disponíveis para uso imediato, dependendo de consultas manuais ou processos burocráticos e lentos para reservar um espaço de estudo em grupo, o que acaba algumas vezes em desistência do uso desses serviços devido a essa tardança.

### A solução
O **FIAP Labs** foi pensado para automatizar essa consulta e reserva. O app permite que o aluno visualize em tempo real quais salas estão liberadas, verifique as especificações técnicas de cada laboratório (como hardware superior ou monitores maiores) e realize agendamentos instantâneos para si e seus colegas, respeitando as políticas de horário da instituição.

**Operação Escolhida:** Aprimoramento da Experiência do Aluno e Gestão de Infraestrutura. Escolhemos este foco pois a otimização do uso dos espaços físicos reflete diretamente na qualidade acadêmica e na agilidade do dia a dia no campus.

### Funcionalidades Implementadas
- **Dashboard de Salas**: Visualização de Labs e salas de aula por andar.

- **Filtros de Hardware**: Identificação de salas com recursos específicos (PCs de alta performance, monitores ultrawide).

- **Agendamento Instantâneo**: Fluxo de reserva com seleção de data, horário e inclusão de RMs dos acompanhantes.

- **Gestão de Reservas**: Tela para consulta e cancelamento de agendamentos ativos.

- **Validação de Regras**: Sistema de trava para datas e horários fora das políticas da faculdade.


## 🛠️ Decisões Técnicas
### Estrutura do projeto
O projeto foi estruturado utilizando **React Native** com **Expo**. Optamos por uma arquitetura de componentes reutilizáveis (como o ***Button*** e ***FormAgendamento***) para garantir a consistência visual e facilitar a manutenção do código. Para a estrutura de pastas, escolhimos distribuir os arquivos com base nos tipos de arquivos (layer-based) para poder ter uma estrutura inicial e enxuta, porém legível e organizada o suficiente para esta primeira versão.

Estrutura de pastas
```
└── assets/
    src/
    ├── app/
    ├── components/
    │   └── Button/
    │   └── FormAgendamento/
    │   └── Layout/
    ├── data/
    └── styles/
```

### Hooks utilizados
- **useState:** Gerenciamento de estados locais, como dados de formulário, visibilidade de modais e armazenamento temporário da lista de agendamentos.
- **useEffect:** Utilizado para a sincronização de dados e atualização da interface, incluindo mecanismos de polling para simular a atualização em tempo real da lista de reservas.

### Navegação
A navegação foi organizada através do Expo Router, utilizando o padrão de rotas para o fluxo de telas e Bottom Tabs para alternar entre consulta de salas, procura de salas e os agendamentos do usuário, garantindo uma experiência fluida e intuitiva.

## 🚀 Como Rodar o Projeto

Pré-requisitos
- Node.js instalado.
- Expo Go instalado no seu smartphone (para teste físico) ou um emulador Android/iOS configurado.

### Passo a Passo
#### 1. Clone o repositório:
```
git clone https://github.com/seu-usuario/fiap-labflow.git
```

#### 2. Acesse a pasta do projeto:
```
cd fiap-labflow
```
#### 3. Instale as dependências:
```
npm install
```
#### 4. Inicie o projeto:
```
npx expo start
```
#### 5. Escaneie o QR Code com o app Expo Go ou pressione a para Android / i para iOS se estiver usando emulador.

## 📸 Telas do App
<div style="display: flex; flex-direction: row; gap: 10px;">
<img src="https://i.imgur.com/VCexNS8.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/5JsLipX.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/S76VK0T.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/wamy9Ji.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/iuasojC.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/D4PnN1D.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/tW9yApb.jpeg" width="200px" height="450px"/>
<img src="https://i.imgur.com/dpK0RwE.jpeg" width="200px" height="450px"/>
</div>

## 📸 Fluxo do App em funcionamento
https://github.com/user-attachments/assets/024cbb1c-58c0-4337-8799-182615152ddf

## Próximos passos
Para o futuro do projeto, seria possível implementar um sistema completo de autenticação integrado à API da FIAP para validar RMs em tempo real e restringir o acesso apenas a alunos ativos. Também seria desenvolvido um backend robusto com banco de dados persistente, permitindo que os agendamentos fossem sincronizados globalmente entre diferentes dispositivos e usuários.




