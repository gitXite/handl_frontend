import React from 'react';
import { motion } from 'framer-motion';


function MotionWrapper({ className, children, transition = {}, initial = {} }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...initial }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ...transition }}
        >
            {children}
        </motion.div>
    );
}


export default MotionWrapper;
