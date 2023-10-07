import Image from 'next/image'


export default function Home() {
  return (
    <>
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 flex-col mx-auto w-full max-w-2xl">
        <header className="mb-4 lg:mb-6 not-format">
          <address className="flex items-center mb-6 not-italic">
            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <Image width={64} height={64} className="mr-4 w-16 h-16 rounded-full" src="/images/avatar.png" alt="Jose Piñeiro" />
              <div>
                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jose Piñeiro</a>
                <p className="text-base text-gray-500 dark:text-gray-400">Frontend Engineer</p>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  <time dateTime="2023-09-01" title="October 1st, 2023">Oct. 1, 2023</time>
                </p>
              </div>
            </div>
          </address>
        </header>

          <article className="mx-auto w-full max-w-2xl prose lg:prose-xl dark:prose-invert">

              <h1>
                Best practices for building frontend clean architecture
              </h1>
              <div className="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div>
                  <b>This Article is a Work in Progress</b>
                  <div>
                    <p>
                      Thank you for visiting this guide on Frontend Clean Architecture. I want to inform my readers that this article is currently in draft form and is being actively edited and expanded upon. I am continuously working to enhance and refine the content.
                    </p>
                    <p>
                      Thank you for your understanding, and we hope you find this guide helpful as it evolves.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Welcome to my comprehensive guide on Frontend Clean Architecture, a design philosophy that has revolutionized software development. In this discussion, we will explore the principles and benefits of Clean Architecture and illustrate its practical application through the lens of an ecommerce platform.
              </p>

              <h2>
                Understanding Clean Architecture
              </h2>
              <p>
                Clean Architecture is a software design approach that prioritizes maintainability, scalability, and testability. Developed by Robert C. Martin, it offers a structured way to organize code, ensuring that it remains adaptable to changes while maintaining a high degree of separation between different system components. At its core, Clean Architecture seeks to solve the problem of tangled, monolithic codebases by promoting a layered and modular architecture.
              </p>
              <figure>
                <Image width={600} height={600} src="/images/layers.png" alt="Layers" />
                <figcaption>Common layers: <span className="text-red-400">domain</span>, <span className="text-yellow-400">application</span>, <span className="text-blue-400">infrastructure</span> and <span className="text-green-400">presentation</span></figcaption>
              </figure>


                
              <h2 className="text-lg">
                Benefits of Clean Architecture
              </h2>
              <ol>
                  <li><strong>Maintainability</strong>. Clean Architecture makes it easier to understand, update, and extend your codebase over time. By defining clear boundaries between layers, it becomes simpler to identify and fix issues without causing unintended side effects.</li>
                  <li><strong>Scalability</strong>. As your ecommerce platform grows, Clean Architecture allows you to scale different parts of the system independently. Whether you need to increase performance or accommodate more users, this architecture provides the flexibility to do so without a complete rewrite.</li>
                  <li><strong>Testability</strong>. Clean Architecture encourages the creation of automated tests, improving the reliability of your software. By isolating business logic from external dependencies, you can easily write unit tests, integration tests, and end-to-end tests.</li>
              </ol>

              <h3>Challenges of Clean Architecture</h3>
              <p>While Clean Architecture offers numerous advantages, it`s essential to acknowledge some of the challenges it presents:</p>
              <ol>
                  <li><strong>Complexity</strong>. Implementing Clean Architecture can seem complex, especially for smaller projects or development teams that are new to the concept. However, the long-term benefits often outweigh the initial learning curve.</li>
                  <li><strong>Initial Development Time</strong>. Building a system following Clean Architecture principles may require more time and effort upfront. However, this investment pays off as the project progresses and evolves.</li>
              </ol>

              <h3>Practical Example: Ecommerce Platform</h3>
              <p>
                Throughout this guide, we will use an ecommerce platform as an example to illustrate Clean Architecture in action. By dissecting the various components and layers of an ecommerce system, we will showcase how Clean Architecture promotes code organization, separation of concerns, and maintainability.
              </p>
              <p>
                Join us on this journey through Clean Architecture as we delve deeper into its principles and demonstrate how it can transform your software development practices.
              </p>
          </article>
      </div>
    </main>
    
    </>  
  )
}
