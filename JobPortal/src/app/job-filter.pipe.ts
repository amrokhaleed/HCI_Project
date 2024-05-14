import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobFilter'
})
export class JobFilterPipe implements PipeTransform {
  transform(jobs: any[], query: string): any[] {
    if (!jobs || !query.trim()) {
      return jobs;
    }

    query = query.toLowerCase();

    return jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  }
}
