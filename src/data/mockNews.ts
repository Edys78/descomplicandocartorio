import { Article } from '../types';
import cartorioHeroImg from '../assets/images/cartorio_certidao_hero_1789949731289.jpg';
import certidaoRegistroImg from '../assets/images/certidao_nascimento_registro_1789949743306.jpg';

export const INITIAL_ARTICLES: Article[] = [
  // 1. CAPA / DESTAQUE PRINCIPAL
  {
    id: 'art-destaque-01',
    title: 'Lei 14.382/2022 Revoluciona o Registro Civil: Como Corrigir Certidões Direto no Cartório Sem Juiz',
    excerpt: 'Descubra como o novo marco legal do Registro Público desburocratizou as retificações administrativas, permitindo correções de erros evidentes em poucos dias diretamente com o Oficial de Registro.',
    content: [
      'A Lei nº 14.382/2022 representou o maior avanço na desjudicialização dos serviços notariais e registrais no Brasil nas últimas décadas. Antes dessa inovação legislativa, qualquer pequena incorreção em uma certidão de nascimento, casamento ou óbito frequentemente exigia a contratação de advogado e uma morosa ação judicial de retificação de registro civil.',
      'Hoje, o artigo 110 da Lei de Registros Públicos (Lei nº 6.015/1973) autoriza o próprio Oficial de Registro Civil das Pessoas Naturais a processar e deferir retificações de erros que não suscitem dúvidas quanto à real identidade ou aos fatos registrados.',
      'Erros de grafia em sobrenomes de imigrantes italianos, portugueses e espanhóis, divergências de datas e omissões de naturalidade agora podem ser retificados administrativamente com a apresentação de certidões comprobatórias em inteiro teor.',
      'Essa agilidade é fundamental para famílias que buscam o reconhecimento de dupla cidadania, regularização de inventários ou emissão de passaportes e documentos de identidade.'
    ],
    category: 'RETIFICAÇÃO',
    subCategory: 'Nascimento',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '6 min de leitura',
    imageUrl: cartorioHeroImg,
    imageCaption: 'Livro oficial de Registro Civil e certidão com selo notarial em mesa de cartório.',
    isFeatured: true,
    isBreaking: true,
    claps: 489,
    commentsCount: 34,
    legalBasis: 'Art. 110 da Lei 6.015/73 com redação dada pela Lei 14.382/2022',
    practicalTips: [
      'Solicite sempre certidões em formato Inteiro Teor (digitada e reprográfica) para comprovar o erro de grafia.',
      'Documentos emitidos no exterior devem conter Apostila de Haia e tradução juramentada com registro em RTD.',
      'O requerimento pode ser protocolado em qualquer cartório de registro civil, via CRC Nacional.'
    ]
  },

  // 2. CURIOSIDADES - O QUE É RETIFICAÇÃO?
  {
    id: 'curiosidade-o-que-e',
    title: 'O Que É Retificação de Registro Civil? Diferenças Entre a Via Administrativa e Judicial',
    excerpt: 'Entenda os fundamentos jurídicos da retificação de assentos e saiba quando seu caso pode ser resolvido direto no balcão do cartório ou quando exige intervenção do Poder Judiciário.',
    content: [
      'A retificação de registro civil é o procedimento legal destinado a corrigir erros, omissões ou inexatidões presentes em assentos lavrados no Cartório de Registro Civil das Pessoas Naturais — tais como certidões de nascimento, casamento, união estável ou óbito.',
      'A via administrativa ocorre inteiramente no cartório de registro civil. Aplica-se a erros de fácil constatação através de confronto documental: erros ortográficos, divergência na indicação de município ou estado, inexatidão da data de nascimento ou casamento comprovada por documento de origem.',
      'Já a via judicial permanece reservada para situações de alta complexidade, impugnações de terceiros, divergências graves de filiação biológica ou pedidos que envolvam potencial prejuízo a direitos sucessórios de terceiros.',
      'Com a integração da Central de Informações do Registro Civil (CRC Nacional), os pedidos administrativos ganharam tramitação eletrônica, reduzindo o tempo médio de conclusão de meses para poucos dias úteis.'
    ],
    category: 'CURIOSIDADES',
    subCategory: 'O que é retificação?',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '4 min de leitura',
    imageUrl: certidaoRegistroImg,
    imageCaption: 'Certidões em inteiro teor e livros de registro em processo de retificação.',
    isDailyFeed: true,
    claps: 312,
    commentsCount: 21,
    legalBasis: 'Lei nº 6.015/1973 e Provimentos do CNJ'
  },

  // 3. CURIOSIDADES - O QUE PRECISA PARA RETIFICAR?
  {
    id: 'curiosidade-o-que-precisa',
    title: 'O Que Precisa Para Retificar? Checklist Completo de Documentos e Certidões',
    excerpt: 'Veja a relação detalhada de certidões em inteiro teor, requerimentos com firma reconhecida e procedimentos para documentos estrangeiros.',
    content: [
      'Para que o Oficial do Cartório de Registro Civil possa deferir a retificação, é necessário apresentar a chamada "cadeia probatória documental contínua".',
      '1. Requerimento formal assinado pelo interessado, descrevendo precisamente o que consta no registro e o que deve ser corrigido.',
      '2. Certidão que contém o erro em Inteiro Teor emitida recentemente (validade recomendada de até 90 dias).',
      '3. Certidões que comprovam a grafia ou dado correto (ex.: certidão de nascimento do pai, casamento dos avós, certidão de desembarque do imigrante).',
      '4. Documentos de identificação pessoal com foto (RG, CNH) e CPF do requerente.',
      'Caso os documentos tenham origem estrangeira (ex.: certidão italiana de nascimento do bisavô), estes devem receber o Apostilamento de Haia no país de origem e a respectiva Tradução Pública Juramentada no Brasil.'
    ],
    category: 'CURIOSIDADES',
    subCategory: 'O que precisa para retificar?',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '5 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Documentação probatória e caneta clássica para preenchimento de requerimentos.',
    isDailyFeed: true,
    claps: 278,
    commentsCount: 19,
    requiredDocs: [
      'Requerimento fundamentado direcionado ao Oficial do RCPN',
      'Certidão a ser retificada em Inteiro Teor (formato digitado e reprográfico)',
      'Certidões e documentos probatórios que demonstram o dado correto',
      'Apostila de Haia e Tradução Juramentada para documentos internacionais'
    ]
  },

  // 4. CURIOSIDADES - E QUEM PODE?
  {
    id: 'curiosidade-quem-pode',
    title: 'E Quem Pode? Legitimidade Ativa e Requisitos Para Solicitar a Retificação',
    excerpt: 'Saiba quem tem direito legal de pedir a retificação de um assento: o próprio titular, herdeiros, parentes em linha reta ou procuradores.',
    content: [
      'A legislação brasileira estabelece que tem legitimidade ativa para requerer a retificação qualquer pessoa que tenha interesse jurídico e legítimo no assento.',
      'O primeiro e principal legitimado é o próprio titular da certidão (quando vivo e capaz).',
      'Em caso de titulares falecidos (muito comum em processos de cidadania estrangeira e inventários), a legitimidade estende-se aos seus herdeiros e parentes em linha reta (filhos, netos, bisnetos, cônjuge ou companheiro).',
      'Também é perfeitamente possível realizar o pedido por meio de procurador habilitado com procuração com poderes específicos para requerer retificações perante o Cartório de Registro Civil.'
    ],
    category: 'CURIOSIDADES',
    subCategory: 'E quem pode?',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '3 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Códigos de normas de registros públicos e legitimidade jurídica.',
    isTickerHighlight: true,
    claps: 245,
    commentsCount: 16
  },

  // 5. RETIFICAÇÃO - NASCIMENTO
  {
    id: 'retificacao-nascimento',
    title: 'Retificação de Certidão de Nascimento: Como Corrigir Erros de Grafia, Paternidade e Datas',
    excerpt: 'Guia passo a passo para consertar erros no assento de nascimento, viabilizando processos de dupla cidadania (italiana, portuguesa, espanhola) e regularização de documentos.',
    content: [
      'O assento de nascimento é a certidão matriz da vida civil do indivíduo. Qualquer incoerência nesse documento propaga-se por todos os demais registros posteriores.',
      'Os casos mais comuns de retificação em nascimento envolvem:',
      '• Erros na grafia de patronímicos (sobrenomes) transmitidos por pais ou avós estrangeiros;',
      '• Divergência entre o dia ou ano real do nascimento e o que constou erroneamente no livro;',
      '• Inclusão tardia de reconhecimento de paternidade ou maternidade socioafetiva;',
      '• Correção da naturalidade quando o nascimento ocorreu em localidade distinta do domicílio dos pais.',
      'Comprovada a cadeia de certidões, o Oficial averba à margem do termo original o texto corretivo e emite uma nova certidão já com os dados devidamente ajustados.'
    ],
    category: 'RETIFICAÇÃO',
    subCategory: 'Nascimento',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '5 min de leitura',
    imageUrl: cartorioHeroImg,
    imageCaption: 'Livros de assento de nascimento em cartório de registro civil.',
    isTickerHighlight: true,
    claps: 390,
    commentsCount: 29
  },

  // 6. RETIFICAÇÃO - CASAMENTO
  {
    id: 'retificacao-casamento',
    title: 'Retificação de Certidão de Casamento: Regime de Bens, Nomes dos Cônjuges e Pactos Antenupciais',
    excerpt: 'Como solucionar incongruências na certidão de casamento, regimes patrimoniais invertidos e grafia de sobrenomes adotados.',
    content: [
      'A certidão de casamento frequentemente apresenta equívocos decorrentes do momento da habilitação matrimonial ou da transcrição de assentos antigos.',
      'Entre os problemas mais recorrentes estão a grafia incorreta dos nomes dos noivos ou de seus respectivos genitores, a omissão da menção à escritura pública de pacto antenupcial ou a declaração equivocada da data e local do enlace.',
      'A retificação pode ser solicitada por qualquer um dos cônjuges perante o cartório onde o casamento foi celebrado ou no cartório de sua atual residência através da CRC.'
    ],
    category: 'RETIFICAÇÃO',
    subCategory: 'Casamento',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '4 min de leitura',
    imageUrl: certidaoRegistroImg,
    imageCaption: 'Certidão de casamento e livro de registro de habilitações.',
    isTickerHighlight: true,
    claps: 260,
    commentsCount: 14
  },

  // 7. RETIFICAÇÃO - ÓBITO
  {
    id: 'retificacao-obito',
    title: 'Retificação de Certidão de Óbito: Como Desbloquear Inventários, Partilhas e Pensões',
    excerpt: 'Atestados de óbito preenchidos com pressa no momento do luto geram erros graves sobre herdeiros e bens. Saiba como retificar rapidamente.',
    content: [
      'O momento do falecimento de um ente querido é marcado por extrema comoção emocional. Não raramente, o declarante do óbito fornece informações imprecisas sobre o estado civil do falecido, existência de testamento, quantidade de filhos ou rol de bens a inventariar.',
      'Quando essas certidões de óbito chegam ao cartório de notas para inventário extrajudicial ou ao juízo de família, o processo trava imediatamente.',
      'A retificação administrativa do assento de óbito permite corrigir o nome dos herdeiros legítimos, o estado civil (se viúvo, casado ou divorciado) e a indicação de bens deixados mediante apresentação das certidões públicas comprobatórias.'
    ],
    category: 'RETIFICAÇÃO',
    subCategory: 'Óbito',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '4 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Procedimentos de retificação em certidões de óbito para inventários.',
    isTickerHighlight: true,
    claps: 318,
    commentsCount: 18
  },

  // 8. PROCEDIMENTOS - ALTERAÇÃO DE PATRONÍMICO
  {
    id: 'proc-patronimico',
    title: 'Alteração de Patronímico (Sobrenome): Inclusão de Sobrenome de Família, Padrastos e Avós',
    excerpt: 'A Lei 14.382/2022 facilitou a inclusão de sobrenomes de ascendentes a qualquer tempo. Veja como resgatar a história da sua família.',
    content: [
      'O patronímico é o sobrenome que identifica a estirpe familiar. Historicamente, a legislação brasileira impunha severas restrições para alterar ou incluir novos sobrenomes.',
      'Com o novo marco legal, o cidadão pode requerer a qualquer momento da vida a inclusão de sobrenomes de ascendentes (maternos ou paternos) que não tenham constado no registro original, desde que comprovado o liame biológico.',
      'Além disso, tornou-se direto e simplificado o acréscimo do sobrenome de padrastos ou madrastas (reconhecimento de vínculo socioafetivo) e a manutenção ou exclusão de sobrenome de casado mesmo na constância ou após o término da sociedade conjugal.'
    ],
    category: 'PROCEDIMENTOS',
    subCategory: 'Alteração de Patronímico',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '5 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Documentos e registros genealógicos para inclusão de patronímicos.',
    claps: 512,
    commentsCount: 42
  },

  // 9. PROCEDIMENTOS - ALTERAÇÃO DE NOME E GÊNERO
  {
    id: 'proc-genero-nome',
    title: 'Alteração de Nome e Gênero: O Passo a Passo Pelo Provimento 73/2018 do CNJ',
    excerpt: 'Direito à identidade: como pessoas trans e não-binárias realizam a alteração de prenome e agnome diretamente no Cartório de Registro Civil.',
    content: [
      'Por decisão histórica do Supremo Tribunal Federal (ADI 4275) regulamentada pelo Provimento nº 73/2018 do Conselho Nacional de Justiça (CNJ), toda pessoa maior de 18 anos tem o direito subjetivo de alterar seu prenome e classificação de gênero diretamente no Registro Civil.',
      'O procedimento é 100% autodeclaratório: não se exige laudo médico, parecer psicológico, autorização judicial ou realização prévia de cirurgia de transgenitalização.',
      'O interessado comparece ao Cartório de Registro Civil munido de seus documentos pessoais e certidões de praxe (certidões cíveis, criminais, eleitorais e da Justiça Federal) para resguardar a fé pública e a segurança jurídica.',
      'O novo assento de nascimento é lavrado sem qualquer menção pejorativa ou discriminatória à alteração.'
    ],
    category: 'PROCEDIMENTOS',
    subCategory: 'Alteração de nome e gênero',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '6 min de leitura',
    imageUrl: certidaoRegistroImg,
    imageCaption: 'Procedimento administrativo autodeclaratório de retificação de registro civil.',
    claps: 630,
    commentsCount: 57
  },

  // 10. PROCEDIMENTOS - ALTERAÇÃO DE PRENOME
  {
    id: 'proc-prenome',
    title: 'Alteração de Prenome: Mude Seu Primeiro Nome Diretamente no Cartório Sem Motivo Específico',
    excerpt: 'Com a nova redação do Artigo 56 da Lei de Registros Públicos, qualquer pessoa maior de 18 anos pode mudar o primeiro nome uma única vez direto no RCPN.',
    content: [
      'Uma das maiores revoluções da Lei 14.382/2022 foi a alteração do artigo 56 da Lei nº 6.015/73. Anteriormente, a mudança de prenome era permitida apenas entre 18 e 19 anos incompletos ou mediante prova de vexame público ou ameaça à testemunha.',
      'Pela regra atual, qualquer pessoa após atingir a maioridade civil (18 anos) pode comparecer pessoalmente ao Cartório de Registro Civil e solicitar a alteração imotivada do seu prenome.',
      'A alteração independe de decisão judicial. O cartório publica a comunicação no sistema eletrônico e emite a nova certidão. Essa faculdade de alteração sem motivo pode ser exercida de forma administrativa uma única vez na vida.'
    ],
    category: 'PROCEDIMENTOS',
    subCategory: 'Alteração de prenome',
    author: {
      name: 'Souza Edy',
      role: 'Especialista em Registros e Procedimentos Cartorários'
    },
    date: '1 de Março de 2026',
    readTime: '4 min de leitura',
    imageUrl: cartorioHeroImg,
    imageCaption: 'Livros e certidões emitidas após alteração imotivada de prenome.',
    claps: 470,
    commentsCount: 38
  }
];

export const INITIAL_COMMENTS: Record<string, import('../types').Comment[]> = {};
