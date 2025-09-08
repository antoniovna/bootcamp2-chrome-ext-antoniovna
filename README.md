# Modo Foco - Extensão para Google Chrome (MV3)

Uma extensão simples e funcional para o Google Chrome, construída com Manifest V3, que ajuda a manter o foco bloqueando sites distrativos durante períodos de trabalho ou estudo.

Este projeto foi desenvolvido com fins de aprendizado e prática durante a disciplina de bootcamp II no UniCEUB, com foco em boas práticas de desenvolvimento de extensões, uso de APIs do Chrome e organização de código.

## Funcionalidades

- **Timer de Foco:** Inicie um cronômetro diretamente do popup da extensão para começar um período de foco.
- **Lista de Bloqueio Personalizável:** Adicione ou remova sites em uma página de configurações dedicada.
- **Bloqueio Automático:** Durante um período de foco ativo, qualquer tentativa de acessar um site da sua lista será redirecionada.
- **Notificação Amigável:** Uma página simples informa que o site foi bloqueado para que você possa voltar à sua tarefa.
- **Controle Simples:** Inicie e pare o modo foco a qualquer momento.

## Estrutura do Projeto

O projeto segue uma estrutura de pastas clara e organizada:

```
/
├─ src/             # Código-fonte da extensão
│  ├─ popup/        # Arquivos do popup (HTML, CSS, JS)
│  ├─ options/      # Arquivos da página de opções
│  ├─ background/   # Service worker para lógica de fundo
│  └─ assets/       # Recursos, como a página de bloqueio
├─ icons/           # Ícones da extensão em vários tamanhos
├─ docs/            # Arquivos para a GitHub Pages (landing page)
├─ manifest.json    # O arquivo de manifesto da extensão (MV3)
├─ README.md        # Este arquivo
└─ LICENSE          # Licença do projeto (MIT)
```

## Instalação e Uso

### Instalação Manual (Modo Desenvolvedor)

1.  Faça o download ou clone este repositório.
    -   Você pode baixar o arquivo `.zip` da [página de Releases](https://github.com/antoniovna/bootcamp2-chrome-ext-antoniovna/releases).
2.  Descompacte o arquivo.
3.  Abra o Google Chrome e acesse `chrome://extensions`.
4.  Ative o **"Modo de desenvolvedor"** no canto superior direito.
5.  Clique em **"Carregar sem compactação"** e selecione a pasta do projeto que você descompactou.
6.  O ícone do "Modo Foco" aparecerá na sua barra de ferramentas!

### Como Usar

1.  Clique com o botão direito no ícone da extensão e vá para **"Opções"** para configurar os sites que você deseja bloquear.
2.  Clique no ícone da extensão para abrir o popup.
3.  Defina por quantos minutos você deseja se concentrar.
4.  Clique em **"Iniciar Foco"**.
5.  Pronto! Tente acessar um dos sites bloqueados para ver a mágica acontecer.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).