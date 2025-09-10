"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { Loader, Sparkles } from "lucide-react";
import { createCompanion } from "@/lib/actions/companion.actions";
import { toast } from "sonner";
import { useState } from "react";

// --- Form schema ---
const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.coerce.number().min(1, { message: "Duration is required." }),
});

type CompanionFormValues = z.infer<typeof formSchema>;

const CompanionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<CompanionFormValues>({
    resolver: zodResolver(formSchema) as Resolver<CompanionFormValues>,
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
    setIsLoading(true);
    try {
      const companion = await createCompanion(values);

      if (companion.id) {
        router.push(`/companions/${companion.id}`);
      } else {
        toast.error("Failed to create companion!");
        console.error("Create companion returned null or undefined");
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong while creating companion!"
      );
      console.error("Create companion error:", error);
    } finally {
      setIsLoading(false);
    }
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 place-items-stretch">
            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-300 mb-2">Subject</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all capitalize w-full">
                        <SelectValue placeholder="Select subject" />
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
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Voice */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-300 mb-2">Voice</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full">
                        <SelectValue placeholder="Select voice" />
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
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Style */}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-300 mb-2">Style</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full">
                        <SelectValue placeholder="Select style" />
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
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-300 mb-2">
                    Duration (min)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="15"
                      {...field}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 hover:cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-2" />
                Building Companion
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Build Your Tutor
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
