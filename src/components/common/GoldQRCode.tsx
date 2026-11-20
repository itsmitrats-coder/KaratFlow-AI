import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface GoldQRCodeProps {
  value: string;
  size?: number;
  label?: string;
  sublabel?: string;
}

export const GoldQRCode: React.FC<GoldQRCodeProps> = ({
  value,
  size = 180,
  label = 'KARAT FLOW DIGITAL SEAL',
  sublabel = 'Cryptographic Custody Proof'
}) => {
  // Deterministic pseudo-random matrix generator based on input string
  const generateMatrix = (str: string, matrixSize: number = 25) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }

    const grid: boolean[][] = [];
    for (let r = 0; r < matrixSize; r++) {
      grid[r] = [];
      for (let c = 0; c < matrixSize; c++) {
        // Corner 7x7 Finder Patterns (top-left, top-right, bottom-left)
        const isTopLeftFinder = r < 7 && c < 7;
        const isTopRightFinder = r < 7 && c >= matrixSize - 7;
        const isBottomLeftFinder = r >= matrixSize - 7 && c < 7;

        if (isTopLeftFinder || isTopRightFinder || isBottomLeftFinder) {
          const lr = isTopLeftFinder ? r : (isTopRightFinder ? r : r - (matrixSize - 7));
          const lc = isTopLeftFinder ? c : (isTopRightFinder ? c - (matrixSize - 7) : c);
          const isOuterBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const isInnerDot = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          grid[r][c] = isOuterBorder || isInnerDot;
          continue;
        }

        // Center 5x5 zone reserved for logo
        const midStart = Math.floor(matrixSize / 2) - 2;
        const midEnd = Math.floor(matrixSize / 2) + 2;
        if (r >= midStart && r <= midEnd && c >= midStart && c <= midEnd) {
          grid[r][c] = false;
          continue;
        }

        // Timing patterns
        if (r === 6 || c === 6) {
          grid[r][c] = (r + c) % 2 === 0;
          continue;
        }

        // Pseudo-random data bits influenced by seed hash
        const bitVal = Math.sin((r * 31 + c * 17) + hash) * 10000;
        grid[r][c] = (Math.floor(bitVal) % 2 === 0);
      }
    }
    return grid;
  };

  const matrixSize = 25;
  const matrix = generateMatrix(value, matrixSize);
  const cellSize = size / matrixSize;

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-[#D6B875]/30 shadow-sm">
      <div 
        className="relative bg-white p-2 rounded-lg"
        style={{ width: size + 16, height: size + 16 }}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="mx-auto"
        >
          {matrix.map((row, r) =>
            row.map((active, c) => {
              if (!active) return null;
              
              // Highlight corner finders in champagne gold
              const isFinder = 
                (r < 7 && c < 7) || 
                (r < 7 && c >= matrixSize - 7) || 
                (r >= matrixSize - 7 && c < 7);

              const fill = isFinder ? '#B8934A' : '#1A1A1A';

              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize * 0.96}
                  height={cellSize * 0.96}
                  rx={isFinder ? cellSize * 0.2 : cellSize * 0.1}
                  fill={fill}
                />
              );
            })
          )}
        </svg>

        {/* Center Karat Flow Ingot Emblem */}
        <div 
          className="absolute inset-0 m-auto flex items-center justify-center w-8 h-8 bg-[#111111] rounded-md border border-[#D6B875] shadow-md pointer-events-none"
        >
          <span className="text-[10px] font-bold text-[#D6B875] font-serif tracking-tighter">KF</span>
        </div>
      </div>

      {label && (
        <div className="text-center mt-2.5">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#111111] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#29372F]" />
            <span>{label}</span>
          </div>
          <span className="block text-[10px] text-[#858585] font-mono mt-0.5 max-w-[200px] truncate">
            {value}
          </span>
          {sublabel && (
            <span className="block text-[10px] text-[#C5A253] font-medium mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
