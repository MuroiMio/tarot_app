import { useState } from 'react';
import tarotCards from '../data/tarot';

const mysticMessages = [
  'あなたの魂が導く未来が、今ここに現れます…',
  '星々の囁きが、あなたの運命を照らします。',
  '静かに目を閉じて、宇宙の声に耳を澄ませてください。',
  'カードは真実を映す鏡…あなたの問いに答えます。',
  '運命の扉が、今ゆっくりと開かれます…',
];

export default function Home() {
  const [card, setCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [message, setMessage] = useState('');

  const drawCard = () => {
    setAnimating(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * tarotCards.length);
      setCard(tarotCards[idx]);
      setFlipped(true);
      setMessage(mysticMessages[Math.floor(Math.random() * mysticMessages.length)]);
      setAnimating(false);
    }, 1200);
  };

  const reset = () => {
    setCard(null);
    setFlipped(false);
    setMessage('');
  };

  return (
    <main style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(ellipse at 50% 30%, #222040 80%, #0a0a1a 100%)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* 星のエフェクト */}
      <div style={{position:'absolute',inset:0,overflow:'hidden',zIndex:0}}>
        {[...Array(70)].map((_,i)=>(
          <div key={i} style={{
            position:'absolute',
            top: `${Math.random()*100}%`,
            left: `${Math.random()*100}%`,
            width: `${Math.random()*2+1}px`,
            height: `${Math.random()*2+1}px`,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            opacity: Math.random()*0.8+0.2,
            boxShadow: '0 0 6px 2px #fff',
            animation: `twinkle ${2+Math.random()*3}s infinite ease-in-out alternate`,
          }}/>
        ))}
        <style>{`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
      <h1 style={{ fontFamily: 'serif', letterSpacing: '0.1em', color: '#ffe6b8', fontSize: '2.7rem', marginBottom: '1.2rem', zIndex:2, textShadow:'0 2px 8px #000a' }}>
        ✦ 神秘のタロット占い ✦
      </h1>
      {!flipped ? (
        <div style={{zIndex:2,display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{perspective:'1200px',marginBottom:'2.2rem'}}>
            <div style={{
              width:220,height:350,
              background:'linear-gradient(120deg,#3e3158 60%,#bfa67a 100%)',
              borderRadius:'16px',
              boxShadow:'0 6px 32px #000c',
              border:'2px solid #fff3',
              display:'flex',alignItems:'center',justifyContent:'center',
              transform: animating ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition:'transform 1.2s cubic-bezier(.7,0,.3,1)',
              position:'relative',
              overflow:'hidden',
              filter: animating ? 'brightness(1.5) blur(1px)' : 'none',
            }}>
              <span style={{color:'#fff8',fontSize:'2.1rem',fontFamily:'serif',textShadow:'0 0 12px #bfa67a,0 2px 8px #000a'}}>TAROT</span>
              <span style={{position:'absolute',bottom:16,right:16,color:'#ffe6b8aa',fontSize:'1rem',fontFamily:'serif'}}>✧</span>
            </div>
          </div>
          <button onClick={drawCard} disabled={animating} style={{ fontSize: '1.4rem', padding: '1rem 2.4rem', borderRadius: '10px', background: 'linear-gradient(90deg,#bfa67a 60%,#ffe6b8 100%)', color: '#3e3158', border: 'none', cursor: animating?'not-allowed':'pointer', fontWeight:'bold', boxShadow:'0 2px 10px #0005', letterSpacing:'0.1em' }}>
            カードを引く
          </button>
          <div style={{marginTop:'2.4rem',color:'#ffe6b8cc',fontSize:'1.1rem',fontFamily:'serif',textShadow:'0 2px 8px #000a'}}>心を静めて、カードを選んでください…</div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', zIndex:2 }}>
          <div style={{perspective:'1200px',marginBottom:'1.4rem',display:'flex',justifyContent:'center'}}>
            <div style={{
              width:220,height:350,
              borderRadius:'16px',
              boxShadow:'0 6px 32px #000c',
              border:'2px solid #ffe6b8',
              background:'#fff',
              overflow:'hidden',
              position:'relative',
              animation:'revealCard 1.2s cubic-bezier(.7,0,.3,1)',
            }}>
              <img
                src={card.image}
                alt={card.name}
                width={220}
                height={350}
                style={{display:'block',width:'100%',height:'100%',objectFit:'cover',borderRadius:'16px',filter:'drop-shadow(0 0 12px #ffe6b8)',cursor:'pointer'}}
                onClick={()=>window.open(`/card?number=${card.number}`,'_blank')}
                onError={e => { e.target.src = '/cards/placeholder.png'; }}
              />
              <span style={{position:'absolute',top:10,right:16,color:'#bfa67a',fontSize:'1.5rem',textShadow:'0 2px 8px #000a'}}>✦</span>
            </div>
          </div>
          <div style={{margin:'1.2rem 0 0.7rem',fontSize:'1.8rem',fontFamily:'serif',color:'#ffe6b8',textShadow:'0 2px 8px #000a'}}>{card.name}</div>
          <div style={{fontSize:'1.1rem',color:'#ffe6b8cc',fontFamily:'serif',marginBottom:'1.2rem',textShadow:'0 2px 8px #000a'}}>{card.description}</div>
          <div style={{margin:'1.2rem 0 1.7rem',fontSize:'1.15rem',color:'#e6d6ff',fontFamily:'serif',textShadow:'0 2px 8px #000a'}}>{message}</div>
          <div style={{margin:'0.7rem 0 1.2rem',fontSize:'1.05rem',color:'#ffe6b8',fontFamily:'serif',background:'#222040cc',borderRadius:'12px',padding:'1rem 1.2rem',boxShadow:'0 2px 12px #0007',whiteSpace:'pre-line'}}>{card.details || 'このカードの詳細解説は準備中です。'}</div>
          <div style={{display:'flex',justifyContent:'center',gap:'1.2rem',margin:'1.2rem 0 0.7rem'}}>
            {/* SNSシェアボタン */}
            <a href={`https://twitter.com/intent/tweet?text=『${card.name}』を引きました！&url=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <img src="/x-logo.svg" alt="Xでシェア" width={32} height={32} style={{verticalAlign:'middle'}} />
            </a>
            <a href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <img src="/line-logo.svg" alt="LINEでシェア" width={32} height={32} style={{verticalAlign:'middle'}} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <img src="/fb-logo.svg" alt="Facebookでシェア" width={32} height={32} style={{verticalAlign:'middle'}} />
            </a>
          </div>
          <button onClick={reset} style={{ marginTop: '0.2rem', fontSize: '1.1rem', padding: '0.8rem 2rem', borderRadius: '10px', background: 'linear-gradient(90deg,#bfa67a 60%,#ffe6b8 100%)', color: '#3e3158', border: 'none', cursor: 'pointer', fontWeight:'bold', boxShadow:'0 2px 10px #0005', letterSpacing:'0.1em' }}>
            もう一度占う
          </button>
        </div>
      )}
      <footer style={{ marginTop: '3rem', color: '#ffe6b8aa', fontSize: '1.05rem', fontFamily:'serif', textShadow:'0 2px 8px #000a', zIndex:2 }}>
        &copy; {new Date().getFullYear()} 神秘のタロット占いアプリ
      </footer>
    </main>
  );
}
