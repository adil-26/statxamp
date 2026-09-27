'use client';

import React, { useState } from 'react';
import { LeaderboardEntry, StoreItem } from '@/types';
import { Trophy, Crown, Flame, Coins, ShieldAlert, Sparkles } from 'lucide-react';

interface LeaderboardViewProps {
  leaderboards: Record<string, LeaderboardEntry[]>;
  storeItems: StoreItem[];
  userCoins: number;
  onBuyItem: (itemId: string, cost: number) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboards,
  storeItems,
  userCoins,
  onBuyItem
}) => {
  const [scope, setScope] = useState<'district' | 'state' | 'national'>('district');

  const currentList = leaderboards[scope] || leaderboards.district;
  const top3 = currentList.slice(0, 3);

  const scopeTabs = [
    { id: 'district' as const, label: 'Pune District' },
    { id: 'state' as const, label: 'Maharashtra State' },
    { id: 'national' as const, label: 'All India Boards' },
  ];

  return (
    <div className="space-y-9 pb-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-cream-50 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-gold-500" />
          Regional Leaderboard & SM Coins Store
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Compete with district peers, level up your solving streaks, and unlock exclusive rewards.
        </p>
      </div>

      {/* Scope Switcher Tabs */}
      <div className="flex items-center justify-center gap-2">
        {scopeTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setScope(tab.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              scope === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-sunset text-white shadow-glow-gold'
                : 'bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-neutral-600 dark:text-neutral-300 hover:border-gold-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Podium Top 3 */}
      {top3.length >= 3 && (
        <div className="flex items-end justify-center gap-3 sm:gap-6 pt-6 pb-2">
          
          {/* Rank 2 (Silver) */}
          <div className="flex flex-col items-center w-28 sm:w-36 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-slate-300 overflow-hidden shadow-md mb-2">
              <img src={top3[1].avatar} alt={top3[1].name} className="w-full h-full object-cover" />
            </div>
            <div className="font-bold text-xs sm:text-sm text-neutral-800 dark:text-cream-100 truncate w-full">{top3[1].name}</div>
            <div className="text-[11px] text-neutral-400">{top3[1].coins} ?</div>
            <div className="w-full h-24 sm:h-32 rounded-t-2xl bg-gradient-to-t from-slate-500 to-slate-400 text-white font-black text-sm flex items-center justify-center mt-2 shadow-sm">
              ?? #2
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="flex flex-col items-center w-32 sm:w-44 text-center">
            <Crown className="w-7 h-7 text-gold-500 fill-gold-500 animate-bounce mb-1" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gold-400 overflow-hidden shadow-glow-gold mb-2 ring-4 ring-gold-400/20">
              <img src={top3[0].avatar} alt={top3[0].name} className="w-full h-full object-cover" />
            </div>
            <div className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-cream-50 truncate w-full">{top3[0].name}</div>
            <div className="text-xs text-gold-500 font-bold">{top3[0].coins} ?</div>
            <div className="w-full h-32 sm:h-44 rounded-t-2xl bg-gradient-to-t from-amber-600 via-gold-500 to-gold-400 text-white font-black text-lg flex items-center justify-center mt-2 shadow-md">
              ?? #1
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="flex flex-col items-center w-28 sm:w-36 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-600 overflow-hidden shadow-md mb-2">
              <img src={top3[2].avatar} alt={top3[2].name} className="w-full h-full object-cover" />
            </div>
            <div className="font-bold text-xs sm:text-sm text-neutral-800 dark:text-cream-100 truncate w-full">{top3[2].name}</div>
            <div className="text-[11px] text-neutral-400">{top3[2].coins} ?</div>
            <div className="w-full h-20 sm:h-24 rounded-t-2xl bg-gradient-to-t from-amber-800 to-amber-700 text-white font-black text-sm flex items-center justify-center mt-2 shadow-sm">
              ?? #3
            </div>
          </div>

        </div>
      )}

      {/* Rankings Table */}
      <div className="max-w-3xl mx-auto bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-cream-100 dark:border-neutral-800 font-bold text-xs text-neutral-400 uppercase tracking-wider">
          Top Solvers Ranking
        </div>

        <div className="divide-y divide-cream-100 dark:divide-neutral-800/80">
          {currentList.map(row => (
            <div
              key={row.rank}
              className={`p-4 flex items-center justify-between gap-4 text-xs transition-colors ${
                row.isUser
                  ? 'bg-gradient-to-r from-coral-500/10 via-gold-500/10 to-transparent font-bold border-l-4 border-coral-500'
                  : 'hover:bg-cream-50 dark:hover:bg-surface-darkCard'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 text-center font-extrabold ${row.rank <= 3 ? 'text-gold-500 text-sm' : 'text-neutral-400'}`}>
                  #{row.rank}
                </span>
                <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-neutral-900 dark:text-cream-100 font-bold text-sm">{row.name}</div>
                  <div className="text-[11px] text-neutral-400">{row.school} � {row.district}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="font-bold text-gold-600 dark:text-gold-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-gold-500" /> {row.coins} ?
                </div>
                <div className="text-coral-500 font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> {row.streak}d
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SM Coins Reward Store */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-cream-50 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-500" />
              SM Coins Rewards Store
            </h3>
            <p className="text-xs text-neutral-400">Redeem coins earned from mock exams and step solvers.</p>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-gold-400/20 text-amber-800 dark:text-gold-300 text-xs font-bold">
            Balance: {userCoins} ?
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {storeItems.map(item => (
            <div
              key={item.id}
              className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-gold-400 transition-colors"
            >
              <div className="space-y-2.5">
                <span
                  className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.badge}
                </span>

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  <ShieldAlert className="w-6 h-6" />
                </div>

                <h4 className="font-bold text-sm text-neutral-900 dark:text-cream-100">{item.name}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</p>
              </div>

              <button
                onClick={() => onBuyItem(item.id, item.cost)}
                className="w-full mt-4 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 text-amber-950 font-bold text-xs shadow-glow-gold hover:scale-102 transition-transform"
              >
                Redeem for {item.cost} ?
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
