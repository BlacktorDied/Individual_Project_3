import { useState } from "react";
import styles from "@/styles/Feedback.module.scss";

export default function Feedback() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            subject: formData.get("subject")?.toString() ?? "",
            message: formData.get("message")?.toString() ?? "",
        };

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to send feedback");
            }

            alert("Thank you for your feedback!");
            form.reset();
        } catch (error) {
            alert("Sorry, there was an error sending your feedback.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="container">
            <div className={styles.main}>
                <h1 className={styles.main__title}>Provide Your Feedback</h1>
                <form className={styles.main__form} onSubmit={handleSubmit}>
                    <div className={styles.form__wrapper}>
                        <div className={styles.form__inputs}>
                            <label className={styles.form__requried}>
                                Name
                                <input type="text" name="name" required />
                            </label>
                            <label className={styles.form__requried}>
                                Email
                                <input type="email" name="email" required />
                            </label>
                            <label className={styles.form__requried}>
                                Subject
                                <select name="subject" required defaultValue="">
                                    <option value="" disabled>
                                        Select a subject
                                    </option>
                                    <option value="general">
                                        General Feedback
                                    </option>
                                    <option value="bug">Bug Report</option>
                                    <option value="suggestion">
                                        Suggestion
                                    </option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>
                        <label className={styles.form__textarea}>
                            Feedback
                            <textarea name="message" rows={4} required />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={styles.form__button}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    );
}
