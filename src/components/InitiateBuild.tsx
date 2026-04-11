import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function InitiateBuild() {
  const [formData, setFormData] = useState({
    projectName: '',
    stack: '',
    scalability: '',
  });

  return (
    <div className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4">
            Initiate <span className="text-gradient-copper">Build</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Let's architect your next-generation software solution together.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="glass-container-strong p-10"
          style={{
            borderRadius: 'var(--radius-main)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-semibold mb-3 opacity-80">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Enter your project name"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                }}
              />
            </div>

            {/* Technical Stack Preference */}
            <div>
              <label className="block text-sm font-semibold mb-3 opacity-80">
                Technical Stack Preference
              </label>
              <select
                value={formData.stack}
                onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-all appearance-none cursor-pointer"
                style={{
                  backdropFilter: 'blur(10px)',
                }}
              >
                <option value="">Select a stack</option>
                <option value="react-node">React + Node.js</option>
                <option value="nextjs">Next.js + Vercel</option>
                <option value="python-fastapi">Python + FastAPI</option>
                <option value="dotnet">C# + .NET Core</option>
                <option value="golang">Go + Microservices</option>
                <option value="custom">Custom Architecture</option>
              </select>
            </div>

            {/* Scalability Requirements */}
            <div>
              <label className="block text-sm font-semibold mb-3 opacity-80">
                Scalability Requirements
              </label>
              <textarea
                placeholder="Describe your scalability needs and expected growth..."
                value={formData.scalability}
                onChange={(e) => setFormData({ ...formData, scalability: e.target.value })}
                rows={4}
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-all resize-none"
                style={{
                  backdropFilter: 'blur(10px)',
                }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              className="group relative w-full px-8 py-5 overflow-hidden mt-4"
              style={{
                background: 'linear-gradient(135deg, #D27D59, #E89B7A)',
                clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              <span className="relative text-white font-semibold tracking-wide text-lg flex items-center justify-center gap-3">
                Launch Integration
                <Send size={20} />
              </span>

              {/* Heating filament effect on hover */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.05, 1.1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  boxShadow: '0 0 60px rgba(210, 125, 89, 0.8)',
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div>
            <div className="text-3xl font-bold text-[#D27D59] mb-1">50+</div>
            <div className="text-sm opacity-60">Projects Delivered</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="text-3xl font-bold text-[#A0D2EB] mb-1">99.9%</div>
            <div className="text-sm opacity-60">Uptime SLA</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="text-3xl font-bold text-[#4EC9B0] mb-1">24/7</div>
            <div className="text-sm opacity-60">DevOps Support</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
