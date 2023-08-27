import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";

const FormSchema = z.object({
  post: z
    .string({ required_error: "Please type something before sending" })
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(255, {
      message: "Bio must not be longer than 255 characters.",
    }),
});

export const CreatePost = () => {
  const ctx = api.useContext();
  const { mutate, isLoading } = api.posts.create.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      post: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    form.resetField("post");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    mutate({ content: data.post });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="w-full max-w-2xl"
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whats on your mind... 💭</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Whats on your mind..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
