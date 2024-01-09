import {useState} from "react";
import Button from "@mui/material/Button";
import {motion, AnimatePresence} from "framer-motion";

export default function TestModule() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="flex h-screen items-center justify-center" color="black">
            <Button onClick={() => setOpen(true)}>modal</Button>
            </div>
            <motion.div
                animate={
                    open ? {opacity: 0.6, zIndex: 3} : {opacity: 0, display: "none"}
            }
            initial={{opacity:0}}
            className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
            />
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {y:0, height: "auto"},
                            collapsed: {y: "100%", height: 0},
                        }}
                        transition={{duration: 0.4, ease:[0.04, 0.62, 0.23, 0.98]}}
                        className="border-gray-50 fixed bottom-0 right-0 left-0 z-10 w-full rounded-t-3xl border-2 border-b-0 bg-white shadow-[0px_-8px_20px_-6px_rgba(0,0,0,0.3)]"
                    >
                        <div className="h-60 p-4">
                            <div className="mb-2 flex justify-end">

                            </div>
                            <div className="flex flex-col space-y-3">
                                <span>Item1</span>
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </>
    )
}