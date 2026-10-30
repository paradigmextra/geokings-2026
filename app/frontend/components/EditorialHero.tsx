import PageHero from './PageHero';
type Props = { eyebrow: string; title: string; description: string; image: string; imageAlt: string; children?: React.ReactNode };
export default function EditorialHero({ eyebrow, description, image, children }: Props) {
  return <PageHero title={eyebrow} subtitle={description} bgImage={image}>{children}</PageHero>;
}
