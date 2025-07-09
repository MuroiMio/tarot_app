import tarotCards from '../data/tarot';

export async function getStaticPaths() {
  const paths = tarotCards.map(card => ({
    params: { number: card.number.toString() }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const card = tarotCards.find(c => c.number === Number(params.number)) || null;
  return { props: { card } };
}

export default function CardDetail({ card }) {
  if (!card) {
    return <div style={{color:'#fff',padding:'2rem'}}>カードが見つかりません</div>;
  }
  const details = card.details || 'このカードの詳細解説は準備中です。';
  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 30%, #222040 80%, #0a0a1a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color:'#ffe6b8', fontFamily:'serif', padding:'2vw' }}>
      <div style={{
        background:'#222040cc',
        borderRadius:'14px',
        boxShadow:'0 4px 18px #000a',
        padding:'clamp(0.7rem, 2vw, 1.2rem) clamp(0.5rem, 3vw, 1.1rem)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        maxWidth:340,
        width:'100%',
        boxSizing:'border-box',
        margin:'0 auto'
      }}>
        <img 
          src={card.image} 
          alt={card.name} 
          style={{
            width:'min(90vw, 180px)',
            height:'auto',
            borderRadius:'10px',
            boxShadow:'0 0 12px #ffe6b8',
            maxHeight:'38vh',
            objectFit:'contain',
            marginBottom:'0.7rem'
          }} 
        />
        <h1 style={{
          fontSize:'clamp(1.1rem, 4vw, 1.45rem)',
          margin:'0.7rem 0 0.3rem',
          textShadow:'0 2px 8px #000a',
          textAlign:'center',
          wordBreak:'break-word'
        }}>{card.name}</h1>
        <div style={{
          fontSize:'clamp(0.95rem, 2.5vw, 1.05rem)',
          color:'#ffe6b8cc',
          marginBottom:'0.5rem',
          textAlign:'center',
          wordBreak:'break-word'
        }}>{card.description}</div>
        <div style={{
          fontSize:'clamp(0.9rem, 2vw, 1rem)',
          color:'#e6d6ff',
          marginBottom:'1.1rem',
          whiteSpace:'pre-line',
          textShadow:'0 2px 8px #000a',
          background:'#18102a55',
          borderRadius:'8px',
          padding:'0.7rem 0.5rem',
          maxWidth:'100%',
          boxSizing:'border-box',
          textAlign:'left',
          lineHeight:1.7
        }}>{details}</div>
        <button 
          onClick={()=>router.back()} 
          style={{
            fontSize:'clamp(0.95rem, 2vw, 1.03rem)',
            padding:'0.5rem 1rem',
            borderRadius:'7px',
            background:'linear-gradient(90deg,#bfa67a 60%,#ffe6b8 100%)',
            color:'#3e3158',
            border:'none',
            cursor:'pointer',
            fontWeight:'bold',
            boxShadow:'0 2px 8px #0005',
            letterSpacing:'0.1em',
            width:'100%',
            maxWidth:'220px',
            marginTop:'0.4rem'
          }}
        >一覧に戻る</button>
      </div>
    </main>
  );
}

