import { Container } from "@/components";
import { ContactForm } from "@/features/contact";
import type { NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact us</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos nam, eligendi aut magni autem doloremque quas delectus ipsum consequuntur molestias?"
        />
      </Head>
      <section className="mt-16">
        <Container>
          <h1>Contact us</h1>
          <p className="mb-8 mt-2 text-sm">
            Questions, suggestions or others. Whatever it is, we are happy to
            hear from you!
          </p>
          <ContactForm />
        </Container>
      </section>
    </>
  );
};

export default Contact;
