# LocusPark - Sistema Multi-Tenant de Gestão de Estacionamentos

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

--

## 📜 Descrição do Projeto

O **LocusPark** é uma plataforma de gestão B2B SaaS Multi-Tenant de alto desempenho voltada para o controle, monitoramento e precificação inteligente de estacionamentos e pátios comerciais. Desenvolvido com foco absoluto em qualidade técnica, o sistema utiliza a metodologia **TDD (Test-Driven Development)** na construção do backend e adota componentização reativa baseada em **Signals** no frontend.

A aplicação utiliza uma arquitetura totalmente desacoplada, dividida em duas branches principais no repositório:
* **`backend`**: Uma API RESTful em Java e Spring Boot governando o isolamento de dados, autenticação JWT Stateless e regras financeiras complexas.
* **`frontend`**: Uma aplicação SPA em Angular e Tailwind CSS contendo o painel administrativo e o configurador dinâmico de pátio e tarifas.

## ✨ Funcionalidades Principais

* *Isolamento Multi-Tenant Estrito*:
    * Arquitetura de banco compartilhado com coluna discriminadora (company_id). Toda requisição intercepta o token JWT e valida o pátio correto no servidor, impedindo vazamento de dados entre concorrentes.

* *Hierarquia de Níveis de Acesso (RBAC Blindado)*:
    * SUPER_ADMIN: Controle máster global sobre as empresas cadastradas no SaaS.
    * ADMIN: Dono ou gerente do pátio, com controle de CRUD de usuários locais, mensalistas e parametrização financeira.
    * EMPLOYEE: Operador de guarita focado em operações de check-in e check-out em tempo real.

* *Configurador Tarifário Avançado (Baseado nas Telas Operacionais)*:
    * *Tarifas Rotativas*: Cobrança customizada da primeira hora e fracionamento sequencial (ex: blocos de 15 minutos).
    * *Regras Extras*: Configuração de tolerâncias por lei, taxas fixas de pernoite e multa por perda de ticket físico.
    * *Gatilhos de Diária*: Conversão automática do valor acumulado por horas em diária cheia para beneficiar o cliente.
    * *Convênios e Selos*: Parcerias com o comércio local aplicando descontos fixos, porcentagens ou abono de horas.

---
