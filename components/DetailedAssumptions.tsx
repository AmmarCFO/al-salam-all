import React from 'react';
import { motion } from 'framer-motion';

interface DetailedAssumptionsProps {
  lang: 'en' | 'ar';
}

const TEXTS = {
  en: {
    title: 'Model Assumptions & Seasonal Rate Structure',
    subtitle: 'Comprehensive rate guide and segment breakdowns driving the annual feasibility model.',
    seasonTitle: 'Active Operating Cycle',
    ratesTitle: 'Base Monthly Rates (SAR) / Normal Scenario',
    breakdownTitle: 'Detailed Revenue Breakdown by Unit Type & Scenario (100% Occ.)',
    peakSeason: 'Continuous Year-Round',
    offSeason: 'Off-Season',
    months: 'Months',
    pctYear: '% of Year',
    rateType: 'Rate Type',
    twoBR: '2 Bedroom (2BR)',
    threeBR: '3 Bedroom (3BR)',
    unitType: 'Segment / Unit Type',
    units: 'Units',
    peakMIndex: 'Peak Mo.',
    offMIndex: 'Off Mo.',
    baseRev: 'Base Revenue',
    pessimistic: 'Pessimistic (-5%)',
    base: 'Base (Normal)',
    optimistic: 'Optimistic (+5%)',
    grandTotal: 'GRAND TOTAL (100% Occ.)',
    ltrOff: 'LTR (Off-Season, 7 mo.)',
    ltrPeak: 'LTR (Peak Season, 5 mo.)',
    strOff: 'STR (Off-Season, 7 mo.)',
    strPeak: 'STR (Peak Season, 5 mo.)',
    footnote: 'Calculations assume 30.4 days per month average; short-term and long-term rental rates are mapped based on continuous operations.'
  },
  ar: {
    title: 'افتراضات النموذج وهيكل الأسعار الموسمية',
    subtitle: 'دليل شامل للأسعار وتفاصيل الفئات المحركة لنموذج الجدوى السنوي.',
    seasonTitle: 'دورة التشغيل النشطة',
    ratesTitle: 'أسعار الإيجار الشهرية الأساسية (بالريال) / السيناريو الطبيعي',
    breakdownTitle: 'تفاصيل توزيع الإيرادات حسب نوع الوحدة والسيناريو (عند إشغال ١٠٠٪)',
    peakSeason: 'تشغيل سنوي مستمر',
    offSeason: 'الموسم العادي (خارج الذروة)',
    months: 'الأشهر',
    pctYear: 'نسبة من السنة',
    rateType: 'نوع خطة الأسعار',
    twoBR: 'غرفتين وصالة (2BR)',
    threeBR: 'ثلاث غرف وصالة (3BR)',
    unitType: 'فئة / نوع الوحدة',
    units: 'الوحدات',
    peakMIndex: 'أشهر النشاط',
    offMIndex: 'الأشهر العادية',
    baseRev: 'الإيراد الأساسي',
    pessimistic: 'متحفظ (-٥٪)',
    base: 'أساسي (طبيعي)',
    optimistic: 'متفائل (+٥٪)',
    grandTotal: 'إجمالي المحفظة (عند إشغال ١٠٠٪)',
    ltrOff: 'طويل الأجل (LTR)',
    ltrPeak: 'طويل الأجل (LTR)',
    strOff: 'قصير الأجل (STR)',
    strPeak: 'قصير الأجل (STR)',
    footnote: 'تفترض الحسابات متوسط ٣٠.٤ يومًا في الشهر؛ تسعير الإيجار يتطابق مع شروط العقود وتوزيع المحفظة التشغيلية.'
  }
};

const DETAILED_ROWS = [
  { segmentKey: '2br_str', segmentEn: '2BR STR (Short-Term Segment)', segmentAr: 'غرفتين وصالة قصير الأجل (STR)', units: 10, peak: 12, off: 0, pessimistic: 1710000, base: 1800000, optimistic: 1890000 },
  { segmentKey: '2br_ltr', segmentEn: '2BR LTR (Long-Term Segment)', segmentAr: 'غرفتين وصالة طويل الأجل (LTR)', units: 5, peak: 12, off: 0, pessimistic: 726750, base: 765000, optimistic: 803250 },
  { segmentKey: '3br_str', segmentEn: '3BR STR (Short-Term Segment)', segmentAr: 'ثلاث غرف وصالة قصير الأجل (STR)', units: 5, peak: 12, off: 0, pessimistic: 1054500, base: 1110000, optimistic: 1165500 },
  { segmentKey: '3br_ltr', segmentEn: '3BR LTR (Long-Term Segment)', segmentAr: 'ثلاث غرف وصالة طويل الأجل (LTR)', units: 3, peak: 12, off: 0, pessimistic: 537795, base: 566100, optimistic: 594405 }
];

const DetailedAssumptions: React.FC<DetailedAssumptionsProps> = ({ lang }) => {
  const isRTL = lang === 'ar';
  const t = TEXTS[lang];
  const locale = isRTL ? 'ar-SA' : 'en-US';

  return (
    <div className={`mt-12 sm:mt-16 w-full max-w-6xl mx-auto space-y-12 ${isRTL ? 'font-cairo text-right' : 'font-sans text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Title */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
          {t.title}
        </h3>
        <p className="text-xs sm:text-base text-gray-500 font-medium">
          {t.subtitle}
        </p>
      </div>

      {/* Grid of Season split & Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Season Split Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              {t.seasonTitle}
            </h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-purple-50/50 p-3.5 rounded-xl border border-purple-100/50">
                <div>
                  <span className="block font-bold text-gray-900 text-sm sm:text-base">{t.peakSeason}</span>
                  <span className="text-xs text-gray-500">{isRTL ? 'طوال ١٢ شهراً في السنة' : 'All 12 Months of the Year'}</span>
                </div>
                <div className="text-right">
                  <span className="block font-black text-purple-900 text-lg sm:text-xl">12 {t.months}</span>
                  <span className="text-xs font-semibold text-purple-600">100.0%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>{isRTL ? 'إجمالي الدورة السنوية' : 'Total annual cycle'}</span>
            <span className="text-purple-600 font-extrabold">12 {isRTL ? 'أشهر' : 'Months'} (100.0%)</span>
          </div>
        </div>

        {/* Base Rates Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            {t.ratesTitle}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2.5 text-left rtl:text-right font-bold text-xs uppercase tracking-wider">{t.rateType}</th>
                  <th className="py-2.5 text-center font-bold text-xs uppercase tracking-wider text-purple-600">{t.twoBR}</th>
                  <th className="py-2.5 text-center font-bold text-xs uppercase tracking-wider text-teal-600">{t.threeBR}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 font-semibold text-gray-700">{isRTL ? 'طويل الأجل (Executive LTR)' : 'Executive LTR'}</td>
                  <td className="py-3 text-center font-bold text-gray-900 tabular-nums">12,750 <span className="text-[10px] text-gray-400 font-normal">/mo</span></td>
                  <td className="py-3 text-center font-bold text-gray-900 tabular-nums">15,725 <span className="text-[10px] text-gray-400 font-normal">/mo</span></td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 font-semibold text-gray-700">{isRTL ? 'قصير الأجل (STR Segment)' : 'STR Segment'}</td>
                  <td className="py-3 text-center font-bold text-gray-900 tabular-nums">15,000 <span className="text-[10px] text-gray-400 font-normal">/mo</span></td>
                  <td className="py-3 text-center font-bold text-gray-900 tabular-nums">18,500 <span className="text-[10px] text-gray-400 font-normal">/mo</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-4 leading-relaxed italic">{t.footnote}</p>
        </div>

      </div>

      {/* Detailed Revenue Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm overflow-hidden">
        <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          {t.breakdownTitle}
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-gray-600 text-center">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold bg-gray-50/50">
                <th className="py-3 px-4 text-left rtl:text-right font-black">{t.unitType}</th>
                <th className="py-3 px-2 font-bold">{t.units}</th>
                <th className="py-3 px-2 font-bold">{t.peakMIndex}</th>
                <th className="py-3 px-4 font-bold text-right rtl:text-left text-gray-400">{t.pessimistic}</th>
                <th className="py-3 px-4 font-extrabold text-right rtl:text-left text-purple-900 bg-purple-50/50">{t.base}</th>
                <th className="py-3 px-4 font-bold text-right rtl:text-left text-[#10B981]">{t.optimistic}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DETAILED_ROWS.map((row) => (
                <tr key={row.segmentKey} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-3 px-4 text-left rtl:text-right font-bold text-gray-900">
                    {isRTL ? row.segmentAr : row.segmentEn}
                  </td>
                  <td className="py-3 px-2 font-semibold tabular-nums text-gray-700">{row.units}</td>
                  <td className="py-3 px-2 font-medium text-purple-600 tabular-nums">{row.peak}</td>
                  <td className="py-3 px-4 font-semibold text-right rtl:text-left tabular-nums text-gray-500">
                    {row.pessimistic.toLocaleString(locale)}
                  </td>
                  <td className="py-3 px-4 font-black text-right rtl:text-left tabular-nums text-purple-950 bg-purple-50/20">
                    {row.base.toLocaleString(locale)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-right rtl:text-left tabular-nums text-[#10B981]">
                    {row.optimistic.toLocaleString(locale)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-900 bg-gray-900 text-white font-bold text-xs sm:text-sm">
                <td className="py-4 px-4 text-left rtl:text-right font-black rounded-l-2xl rtl:rounded-r-2xl rtl:rounded-l-none">
                  {t.grandTotal}
                </td>
                <td className="py-4 px-2 font-black tabular-nums">23</td>
                <td className="py-4 px-2 font-bold text-purple-300 tabular-nums">12</td>
                <td className="py-4 px-4 text-right rtl:text-left font-black tabular-nums text-gray-200">
                  4,029,045
                </td>
                <td className="py-4 px-4 text-right rtl:text-left font-extrabold tabular-nums text-purple-100 bg-purple-950">
                  4,241,100
                </td>
                <td className="py-4 px-4 text-right rtl:text-left font-black tabular-nums text-emerald-300 rounded-r-2xl rtl:rounded-l-2xl rtl:rounded-r-none">
                  4,453,155
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DetailedAssumptions;
