# Calculadora de Pace

Aplicação web para calcular pace de corrida ou tempo. Útil para corredores planejarem treinos e provas.

## Funcionalidades

- ✅ Calcular pace a partir de tempo e distância
- ✅ Calcular tempo necessário a partir de pace e distância
- ✅ Interface responsiva e acessível
- ✅ Navegação por teclado (Tab, Enter, Esc)
- ✅ Validação de entrada
- ✅ Formatação automática de tempo

## Como usar

1. Preencha dois dos três campos (distância, tempo ou pace)
2. Pressione Enter ou clique em "Calcular"
3. O terceiro valor será calculado automaticamente
4. Use Esc para limpar os campos

## Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização modular
- **React Hooks** - Gerenciamento de estado customizado

## Estrutura do projeto

```
app/
├── components/          # Componentes React
│   ├── InputDistancia.tsx
│   ├── InputTempo.tsx
│   ├── InputPace.tsx
│   └── Resultado.tsx
├── hooks/              # Hooks customizados
│   └── usePaceCalculator.ts
├── page.tsx           # Página principal
└── page.module.css    # Estilos
```

## Instalação e execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Atalhos de teclado

- **Tab** - Navegar entre campos
- **Enter** - Calcular resultado
- **Esc** - Limpar todos os campos
