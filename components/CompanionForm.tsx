"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { Mic, Sparkles } from "lucide-react";

// --- Form schema ---
const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.number().min(1, { message: "Duration is required." }),
});

type CompanionFormValues = z.infer<typeof formSchema>;

const CompanionForm = () => {
  const form = useForm<CompanionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit: SubmitHandler<CompanionFormValues> = async (values) => {
    console.log("Form submitted:", values);
    // Example redirect if using API
    // const companion = await createCompanion(values);
    // if (companion) redirect(`/companions/${companion.id}`);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Companion Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Companion name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the companion name"
                    {...field}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Subject</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all capitalize">
                      <SelectValue placeholder="Select the subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {subjects.map((subject) => (
                        <SelectItem
                          key={subject}
                          value={subject}
                          className="capitalize focus:bg-slate-700 focus:text-white"
                        >
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Topic */}
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">
                  What should the companion help with?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex. Derivatives & Integrals"
                    {...field}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Voice</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <SelectValue placeholder="Select the voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="male" className="focus:bg-slate-700">
                          Male
                        </SelectItem>
                        <SelectItem
                          value="female"
                          className="focus:bg-slate-700"
                        >
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Style */}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Style</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <SelectValue placeholder="Select the style" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem
                          value="formal"
                          className="focus:bg-slate-700"
                        >
                          Formal
                        </SelectItem>
                        <SelectItem
                          value="casual"
                          className="focus:bg-slate-700"
                        >
                          Casual
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">
                  Estimated session duration (minutes)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="15"
                    {...field}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Build Your Tutor
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
