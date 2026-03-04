import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRFID } from '@/context/RFIDContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { UserPlus, ArrowLeft } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rfidId: z.string().min(2, 'RFID ID is required').regex(/^[A-Za-z0-9-]+$/, 'Use letters, numbers, and hyphens only'),
  department: z.string().min(1, 'Department is required'),
});

type FormValues = z.infer<typeof schema>;

export default function AddEmployee() {
  const navigate = useNavigate();
  const { addEmployee, employees } = useRFID();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', rfidId: '', department: '' },
  });

  function onSubmit(values: FormValues) {
    const exists = employees.some(e => e.rfidId === values.rfidId);
    if (exists) {
      toast.error('An employee with this RFID ID already exists.');
      return;
    }
    addEmployee(values);
    toast.success(`Employee ${values.name} added.`);
    form.reset();
    navigate('/');
  }

  return (
    <div className="container max-w-xl space-y-6 py-8">
      <Button variant="ghost" size="sm" className="gap-2 -ml-2" onClick={() => navigate('/')}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Add Employee</CardTitle>
              <CardDescription>Register a new employee and assign an RFID badge.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Priya Patel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rfidId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RFID badge ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. RF-1016" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Engineering, HR, Design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  Add employee
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
