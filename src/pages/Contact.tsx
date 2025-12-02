import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import BackgroundScene from "@/components/backgroundscene"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

// ⭐ Schema
const contactSchema = z.object({
  name: z.string().min(2, "contact.errors.name"),
  email: z.string().email("contact.errors.email"),
  phone: z.string().min(6, "contact.errors.phone"),
  message: z.string().min(10, "contact.errors.message"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export const Contact = ({ onLoaded }: { onLoaded: () => void }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    // Anti-spam
    formData.append("honeypot", "")
    formData.append("_captcha", "false")

    await fetch("https://formsubmit.co/oskarlindqvist94@gmail.com", {
      method: "POST",
      body: formData,
    })

    reset()
    setOpen(true)
  }

  return (
    <div className="relative w-full h-screen text-white">
      <BackgroundScene onLoaded={onLoaded} />

      {/* Center wrapper */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="
            text-4xl md:text-5xl font-bold mb-2
            bg-gradient-to-b from-white to-purple-400
            bg-clip-text text-transparent
          ">
            {t("contact.title")}
          </h1>

          <p className="text-white/70 text-sm md:text-base">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          <div className="rounded-3xl p-[1px] bg-gradient-to-r from-pink-500/60 via-purple-500/60 to-blue-500/40 shadow-[0_0_50px_rgba(168,85,247,0.45)]">
            <Card className="bg-black/70 border border-white/10 backdrop-blur-xl rounded-3xl">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-2xl text-white">
                  {t("contact.form_title")}
                </CardTitle>
                <CardDescription className="text-white/60">
                  {t("contact.form_description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                  {/* Name */}
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-gray-300 pb-1">
                      {t("contact.name")}
                    </Label>
                    <Input
                      id="name"
                      className="bg-white/5 border-white/15 text-white"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-pink-300">
                        {t(errors.name.message as string)}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-gray-300 pb-1">
                      {t("contact.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-white/5 border-white/15 text-white"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-pink-300">
                        {t(errors.email.message as string)}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-gray-300 pb-1">
                      {t("contact.phone")}
                    </Label>
                    <Input
                      id="phone"
                      className="bg-white/5 border-white/15 text-white"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-xs text-pink-300">
                        {t(errors.phone.message as string)}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-gray-300 pb-1">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      className="min-h-[120px] bg-white/5 border-white/15 text-white resize-none"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-pink-300">
                        {t(errors.message.message as string)}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 cursor-pointer"
                  >
                    {isSubmitting ? t("contact.sending") : t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="
          border border-white/10 bg-black/70 backdrop-blur-2xl
          rounded-3xl text-center shadow-[0_0_40px_rgba(168,85,247,0.45)]
        ">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t("contact.success_title")}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {t("contact.success_message")}
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => setOpen(false)}
            className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 cursor-pointer"
          >
            {t("contact.close")}
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Contact
